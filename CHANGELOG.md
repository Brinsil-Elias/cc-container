# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2024-09-14

### Added

- Initial release of cc-container CLI tool
- `init` command to generate Docker development container configurations
- Interactive prompts for container setup using inquirer
- Pre-configured VS Code Dev Container with Claude Code CLI
- Network security implementation with iptables firewall
- Domain-based filtering using ipset for allowed services
- Support for essential development services (GitHub, NPM, Anthropic API, VS Code services)
- Docker container with Node.js 20 runtime environment
- Development tools pre-installed: Git, GitHub CLI, fzf, zsh with powerline10k
- VS Code extensions bundle: Claude Code, ESLint, Prettier, GitLens
- Non-root user configuration for enhanced security
- Persistent volumes for bash history and Claude configuration
- Command-line options:
  - `--output-dir` / `-o`: Specify custom output directory
  - `--force` / `-f`: Force overwrite existing configuration
- TypeScript support with strict configuration
- ESM module format for modern Node.js compatibility
- Comprehensive README with usage examples and feature documentation

### Security

- Network access restricted to essential development services only
- Automatic firewall rule generation with iptables
- IP resolution and CIDR aggregation for domain filtering
- Container runs as non-root `node` user
- Localhost and DNS access permitted for development workflow

### Dependencies

- commander: CLI framework for command handling
- inquirer: Interactive command-line prompts
- chalk: Terminal output styling
- ora: Loading spinner animations
- TypeScript toolchain with tsup for build process

[Unreleased]: https://github.com/Brinsil-Elias/cc-container/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/Brinsil-Elias/cc-container/releases/tag/v0.0.1
