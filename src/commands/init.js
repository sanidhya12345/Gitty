/** @format */

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export async function init() {
  try {
    const ngitPath = ".ngit";

    //Now create a basic repository structure

    //ensureDir metthod is used to check whether the particular dir is present or not if it is not
    // present then it will create one.
    await fs.ensureDir(ngitPath);
    await fs.ensureDir(path.join(ngitPath, "objects"));
    await fs.ensureDir(path.join(ngitPath, "refs"));

    //Initialize the HEAD to point to master branch

    await fs.writeFile(path.join(ngitPath, "HEAD"), "ref: refs/head/master\n");
    console.log(chalk.green("Initializing the empty gitty repository"));
  } catch (error) {
    console.log(chalk.red("Error initialising the repository:"), error.message);
  }
}
