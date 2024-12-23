import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';

export async function commit(options) {
  try {
    if (!options.message) {
      console.error(chalk.red('Please provide a commit message using -m flag'));
      return;
    }

    const stagingPath = path.join('.ngit', 'staging');
    if (!await fs.pathExists(stagingPath)) {
      console.error(chalk.yellow('Nothing to commit (no files in staging area)'));
      return;
    }

    // Read staging area
    const stagedFiles = await fs.readdir(stagingPath);
    if (stagedFiles.length === 0) {
      console.error(chalk.yellow('Nothing to commit (staging area is empty)'));
      return;
    }

    // Create commit object
    const timestamp = new Date().toISOString();
    const commitData = {
      message: options.message,
      timestamp,
      files: {}
    };

    for (const file of stagedFiles) {
      const hash = await fs.readFile(
        path.join(stagingPath, file),
        'utf-8'
      );
      commitData.files[file] = hash;
    }

    // Save commit
    const commitStr = JSON.stringify(commitData, null, 2);
    const commitHash = crypto
      .createHash('sha1')
      .update(commitStr)
      .digest('hex');

    await fs.writeFile(
      path.join('.ngit', 'objects', commitHash),
      commitStr
    );

    // Update HEAD
    const headPath = path.join('.ngit', 'HEAD');
    await fs.writeFile(headPath, commitHash);

    // Clear staging area
    await fs.emptyDir(stagingPath);

    console.log(chalk.green(`Created commit ${commitHash}`));
    console.log(chalk.green(`Message: ${options.message}`));
  } catch (error) {
    console.error(chalk.red('Error creating commit:'), error.message);
  }
}