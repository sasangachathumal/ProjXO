# Changelog

All notable changes to ProjXO will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- markdownlint-disable MD024 -->

---

## [2.0.0] - 2026-05-03

### ✨ Added

#### Track Existing Projects Command

- **`pxo track [path]`** — Add any existing project to ProjXO tracking
  - Automatically detects project framework using a 3-tier confidence scoring system:
    - Config files (`next.config.js`, `angular.json`, `vite.config.ts`, etc.) — 70% base confidence
    - `package.json` dependencies — 50% base confidence
    - Fallback pattern matching (generic React / Vue detection) — 30% base confidence
  - Detects project name from `package.json`, git remote origin, or directory name
  - Detects language (TypeScript or JavaScript) and package manager (npm, yarn, pnpm, bun)
  - Displays confidence score before confirming
  - Falls back to manual entry when auto-detection confidence is too low
  - Naming conflict resolution — when a tracked project already has the same name, prompts to:
    - **Keep both** — rename the new project
    - **Replace** — remove the existing entry and track the new one
    - **Cancel** — abort tracking

#### Track Command Flags

| Flag | Description |
| ---- | ----------- |
| `-m, --manual` | Skip auto-detection and enter project details manually |
| `-y, --yes` | Skip all confirmation prompts |
| `--no-ide` | Skip IDE preference question |
| `--ide <ide>` | Set IDE preference directly without prompting |
| `-f, --force` | Re-track a project even if it is already tracked |

---

## [1.3.0] - 2026-01-10

### ✨ Added

#### New Framework Support

- **Nuxt.js** — Vue.js framework for production applications
- **Next.js + shadcn/ui** — Next.js pre-configured with shadcn/ui components
- **Ionic + React** — Mobile apps using Ionic with React
- **Ionic + Angular** — Mobile apps using Ionic with Angular
- **Ionic + Vue** — Mobile apps using Ionic with Vue

Now supporting **9 different frameworks** and configurations.

#### Stats Command

- **`pxo stats`** — Show statistics of all tracked projects
  - Total project count
  - Count and percentage breakdown by framework type
  - Most used IDE
  - Newest and oldest project activity

---

## [1.2.0] - 2025-12-22

### ✨ Added

#### Recent Projects Command

- **`pxo recent [limit]`** — Show recently accessed projects
  - Displays last 10 projects by default (customizable)
  - Sorted by last accessed time
  - Quick selection and opening with arrow keys

#### Quick Open Command

- **`pxo open <project-name>`** — Instantly open a project by name
  - Direct project opening without browsing the full list
  - Fuzzy search for partial name matches
  - Multiple match selection when needed
  - Updates last accessed timestamp automatically

### 🔧 Changed

- **List Command** — Improved table formatting for better readability
  - Aligned columns (project name, type, last accessed time)
  - Consistent spacing and padding

### 📝 Documentation

- Updated README with `recent` and `open` command usage and examples

---

## [1.1.0] - 2025-12-09

Second major release with local project tracking and the `list` command.

### ✨ Added

- **Automatic Project Tracking** — All projects created through ProjXO are tracked locally using a JSON file. No cloud servers.
- **`pxo list`** — Browse all tracked projects and perform actions:
  - 📂 Open in IDE
  - 📋 Copy path
  - 🗑️ Remove from tracking
  - ℹ️ Show details

### 📦 Dependencies

- `commander@^11.1.0` — Node.js command-line interfaces

---

## [1.0.0] - 2025-12-06

### 🎉 Initial Release

The first stable release of ProjXO — a quick project setup CLI for modern web frameworks.

### ✨ Added

#### Core Features

- **Interactive Project Creation** — User-friendly CLI with arrow key navigation
- **Multiple Framework Support**:
  - React + Vite (JavaScript)
  - React + Vite (TypeScript)
  - Next.js
  - Angular
  - React Native (Expo)
- **IDE Integration** — Automatic project opening in VS Code, Cursor, WebStorm, IntelliJ IDEA, Sublime Text, and Atom
- **Cross-Platform Support** — Works on macOS, Windows, and Linux
- **Smart Path Handling** — Supports home directory expansion (`~`), relative and absolute paths
- **Input Validation** — Project name and directory path validation

#### Developer Experience

- **Zero Configuration** — Works out of the box
- **Modern Tooling** — Uses Vite instead of the deprecated Create React App
- **Minimal Dependencies** — Only essential packages
- **Fast Setup** — Project ready in ~30 seconds

### 📦 Dependencies

- `inquirer@^8.2.6` — Interactive CLI prompts

---

## Migration Guide

### Upgrading to v2.0.0

New `track` command added. No breaking changes — just update and start tracking your existing projects.

```bash
npm update -g projxo

# Track an existing project
pxo track                        # Track current directory
pxo track ~/projects/my-app      # Track a specific path
```

### Upgrading to v1.3.0

New `stats` command and five new frameworks added. No breaking changes.

```bash
npm update -g projxo

# Try new features
pxo stats
pxo
```

### Upgrading to v1.2.0

New `recent` and `open` commands added. No breaking changes.

```bash
npm update -g projxo

pxo recent
pxo open <project-name>
```

### Upgrading to v1.1.0

Project tracking and `list` command added on top of core features. No migration needed.

```bash
npm update -g projxo
pxo
```

### Installing v1.0.0

Initial release — just install and start using.

```bash
npm install -g projxo
pxo
```

---

## Security

- No known security vulnerabilities
- All project data is stored locally on the user's machine (`~/.projxo/projects.json`)
- No external requests (except npm registry for package downloads)

---

## Contributors

- [Sasanga Chathumal](https://github.com/sasangachathumal)

---

## Links

- [GitHub Repository](https://github.com/sasangachathumal/ProjXO)
- [npm Package](https://www.npmjs.com/package/projxo)
- [Issue Tracker](https://github.com/sasangachathumal/ProjXO/issues)
- [Documentation](https://github.com/sasangachathumal/ProjXO#readme)

---

## Support

- 🐛 [Report a bug](https://github.com/sasangachathumal/ProjXO/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/sasangachathumal/ProjXO/issues/new?template=feature_request.md)
- 💬 [Start a discussion](https://github.com/sasangachathumal/ProjXO/discussions)

---

## Legend

| Symbol | Meaning |
| ------ | ------- |
| ✨ | Added — New features |
| 🔧 | Changed — Changes in existing functionality |
| 🗑️ | Deprecated — Soon-to-be removed features |
| 🐛 | Fixed — Bug fixes |
| 🔒 | Security — Security fixes |
| 📝 | Documentation — Documentation changes |

[2.0.0]: https://github.com/sasangachathumal/ProjXO/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/sasangachathumal/ProjXO/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/sasangachathumal/ProjXO/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/sasangachathumal/ProjXO/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sasangachathumal/ProjXO/releases/tag/v1.0.0
