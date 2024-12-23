import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function status() {
  try {
    const stagingPath = path.join('.ngit', 'staging');
    
    console.log(chalk.blue('Repository Status:'));
    
    // Check staged files
    if (await fs.pathExists(stagingPath)) {
      const stagedFiles = await fs.readdir(stagingPath);
      if (stagedFiles.length > 0) {
        console.log(chalk.green('\nStaged files:'));
        stagedFiles.forEach(file => {
          console.log(chalk.green(`  ${file}`));
        });
      } else {
        console.log(chalk.yellow('\nNo files staged for commit'));
      }
    }

    // Show current HEAD
    const headPath = path.join('.ngit', 'HEAD');
    if (await fs.pathExists(headPath)) {
      const head = await fs.readFile(headPath, 'utf-8');
      console.log(chalk.blue('\nCurrent HEAD:'), head);
    }
  } catch (error) {
    console.error(chalk.red('Error showing status:'), error.message);
  }
}