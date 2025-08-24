# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI tool called `cc-container` that helps developers create isolated Docker development containers specifically configured for Claude Code usage. The tool generates development container configurations with network security restrictions and pre-installed Claude Code CLI.

## Development Commands

```bash
# Build the project for distribution
bun run build

# Watch mode for development (rebuilds on file changes)
bun run dev

# Format code with Prettier
bun run format

# Run the built CLI locally
bun start

# Test the CLI after building
node dist/index.js init
```

## Architecture

### Core Application Flow

1. **Entry Point (`src/index.ts`)**: Commander.js CLI setup with single `init` command
2. **Command Handler (`src/command.ts`)**: Main business logic for interactive prompts and directory validation
3. **Utilities (`src/utils.ts`)**: File operations, validation, and user feedback functions
4. **Templates (`templates/`)**: Static files copied to generated `.devcontainer/` folder

### Key Architectural Patterns

- **ESM Module Structure**: Uses ES modules with `.js` imports (TypeScript outputs to `.js`)
- **Template-based Generation**: Copies static files from `templates/` to user's project
- **Interactive CLI**: Uses inquirer for user prompts with validation
- **Error Handling**: Graceful fallbacks for missing directories and overwrite confirmation

### Template Files Structure

The `templates/` folder contains the actual dev container configuration:

- `devcontainer.json`: VS Code Dev Container config with network capabilities
- `Dockerfile`: Node.js 20 base with Claude Code CLI, security tools, zsh setup
- `init-firewall.sh`: Network security script executed on container start

### Security Implementation

Generated containers use:

- `--cap-add=NET_ADMIN` and `--cap-add=NET_RAW` for iptables management
- `postStartCommand` to execute firewall initialization
- Network filtering via iptables/ipset for domain-based access control

## Code Patterns

### CLI Command Structure

Commands use async/await pattern with try/catch error handling. Options are typed interfaces passed to command handlers.

### File Operations

All file operations use Node.js `fs.promises` API for async handling. Template copying uses `fs.copyFile()` for each file individually.

### Path Resolution

Uses `path.resolve()` and `path.join()` consistently. Templates are located relative to compiled JavaScript location in `dist/`.

## Build System

- **tsup**: Single-file bundling with shebang for CLI execution
- **TypeScript**: Strict configuration targeting ES2022
- **ESM Output**: Required for inquirer v9+ compatibility
- **Source Maps**: Enabled for development debugging

## Publishing Configuration

- `.npmignore` excludes source files, keeping only `dist/`, docs, and package metadata
- `templates/` folder excluded from npm package (users generate their own)
- Binary exposed as `cc-container` command pointing to `dist/index.js`
- Package manager: Uses bun for development, but published to npm for broader compatibility
