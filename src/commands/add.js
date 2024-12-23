/** @format */

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import crypto from "crypto";

export async function add(files) {
  try {
    //staging: it is file generally inside the git directory which tells about the next commit.
    const stagingPath = path.join(".ngit", "staging");
    await fs.ensureDir(stagingPath);
    for (const file of files) {
      if (await fs.pathExists(file)) {
        const content = await fs.readFile(file);
        //now the content will be encrypted using crypto module.

        const hash = crypto.createHash("sha1").update(content).digest("hex");

        //store the file content in objects directory

        const objPath = path.join(".ngit", "objects", hash);
        await fs.writeFile(objPath, content);

        //Add to the staging area

        await fs.writeFile(path.join(stagingPath, file), hash);

        console.log(chalk.green(`Added ${file} to the staging area`));
      } else {
        console.log(chalk.red(`File not found: ${file}`));
      }
    }
  } catch (error) {
    console.log(chalk.red("error adding files"), error.message);
  }
}
