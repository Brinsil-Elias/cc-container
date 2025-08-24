import ora from "ora"
import chalk from "chalk"
import inquirer from "inquirer"
import { promises as fs } from "fs"
import { fileURLToPath } from "url"
import { join, resolve, dirname } from "path"

import { validateDirectory, displaySuccessMessage, createDevcontainerFiles } from "./utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface InitOptions {
  outputDir?: string
  force?: boolean
}

export async function initCommand(options: InitOptions = {}): Promise<void> {
  try {
    console.log(chalk.blueBright.bold("\n 🚀 Initialize Claude Code Dev Container \n"))

    let targetDirectory: string

    if (options.outputDir) {
      const validation = await validateDirectory(options.outputDir)
      if (validation !== true) {
        console.error(chalk.red(`Error: ${validation}`))
        process.exit(1)
      }
      targetDirectory = resolve(options.outputDir.trim())
    } else {
      // Interactive mode - prompt for directory
      const cwd = process.cwd()
      const { directoryChoice } = await inquirer.prompt([
        {
          type: "list",
          name: "directoryChoice",
          message: "Specify your project directory?",
          choices: [
            {
              name: `Current directory (${cwd})`,
              value: "current",
            },
            {
              name: "Specify project path",
              value: "custom",
            },
          ],
        },
      ])

      targetDirectory = cwd

      if (directoryChoice === "custom") {
        const { customPath } = await inquirer.prompt([
          {
            type: "input",
            name: "customPath",
            message: "Enter the project directory path:",
            validate: validateDirectory,
          },
        ])
        targetDirectory = resolve(customPath.trim())
      }
    }

    const devcontainerPath = join(targetDirectory, ".devcontainer")

    try {
      await fs.stat(devcontainerPath)

      if (options.force) {
        console.log(chalk.yellow(".devcontainer folder exists, overwriting..."))
      } else {
        const { overwrite } = await inquirer.prompt([
          {
            type: "confirm",
            name: "overwrite",
            message: ".devcontainer folder already exists. Overwrite?",
            default: false,
          },
        ])

        if (!overwrite) {
          console.log(chalk.yellow("Operation cancelled."))
          return
        }
      }
    } catch {}

    const spinner = ora("Creating .devcontainer folder...").start()

    try {
      const templateDir = join(__dirname, "..", "templates")
      const finalDevcontainerPath = await createDevcontainerFiles(targetDirectory, templateDir)
      spinner.succeed("Successfully created .devcontainer folder!")
      displaySuccessMessage(finalDevcontainerPath)
    } catch (error) {
      spinner.fail("Failed to create .devcontainer folder")
    }
  } catch (error) {
    process.exit(1)
  }
}
