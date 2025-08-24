import { promises as fs } from "fs"
import { resolve, join } from "path"
import chalk from "chalk"

export const displaySuccessMessage = (devcontainerPath: string): void => {
  console.log()
  console.log(chalk.green("✅ Development container configuration created!"))
  console.log(chalk.blue(`📁 Location: ${devcontainerPath}`))
  console.log()
  console.log(chalk.cyan("Next steps:"))
  console.log(chalk.white("1. Open VS Code in the project directory"))
  console.log(chalk.white('2. Install the "Dev Containers" extension if not already installed'))
  console.log(
    chalk.white(
      '3. Use Ctrl+Shift+P (Cmd+Shift+P on Mac) and select "Dev Containers: Reopen in Container"',
    ),
  )
  console.log(chalk.white("4. Wait for the container to build and start"))
  console.log()
}

export const validateDirectory = async (input: string): Promise<string | boolean> => {
  if (!input.trim()) {
    return "Please enter a valid path"
  }

  const resolvedPath = resolve(input.trim())
  try {
    const stats = await fs.stat(resolvedPath)
    if (!stats.isDirectory()) {
      return "Path must be a directory"
    }
    return true
  } catch {
    return "Directory does not exist"
  }
}

export const createDevcontainerFiles = async (
  targetDirectory: string,
  templateDir: string,
): Promise<string> => {
  const devcontainerPath = join(targetDirectory, ".devcontainer")

  // Create .devcontainer directory
  await fs.mkdir(devcontainerPath, { recursive: true })

  // Files to copy
  const filesToCopy = ["devcontainer.json", "Dockerfile", "init-firewall.sh"]

  // Copy each file
  for (const filename of filesToCopy) {
    const sourcePath = join(templateDir, filename)
    const destPath = join(devcontainerPath, filename)
    await fs.copyFile(sourcePath, destPath)
  }

  return devcontainerPath
}
