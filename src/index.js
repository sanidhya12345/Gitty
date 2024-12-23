/** @format */

import { program } from "commander";
import chalk from "chalk";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { commit } from "./commands/commit.js";
import { status } from "./commands/status.js";

// console.log(chalk.blue("Welcome to the Gitty VCS"))

program.name("gitty").description("A simple Git-like VCS").version("1.0.0");

program
  .command("init")
  .description("Initializing a new repository")
  .action(init);

program
  .command("add")
  .description("Add files to the staging area")
  .argument("<files...>", "Files to add")
  .action(add);

program
  .command("commit")
  .description("Commit staged changes")
  .option("-m, --message <message>", "Commit message")
  .action(commit);

program.command("status").description("Show repository status").action(status);

program.parse();
