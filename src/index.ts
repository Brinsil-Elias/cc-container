import { Command } from "commander"
import { version } from "../package.json"
import { initCommand } from "./command.js"

const VERSION = version
const program = new Command()

program
  .name("cc-container")
  .description("A CLI tool to run Claude Code in isolated containers")
  .version(VERSION)

program
  .command("init")
  .description("Initialize docker container configuration for Claude Code")
  .option("-o, --output-dir <path>", "Output path for devcontainer files")
  .option("-f, --force", "Overwrite existing .devcontainer without prompting")
  .action(initCommand)

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
