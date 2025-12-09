# Changelog

All notable changes to ProjXO will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-12-06

### 🎉 Initial Release

The first stable release of ProjXO - a quick project setup CLI for modern web frameworks.

### ✨ Added

#### Core Features

- **Interactive Project Creation** - User-friendly CLI with arrow key navigation
- **Multiple Framework Support**:
  - React + Vite (JavaScript)
  - React + Vite (TypeScript)
  - Next.js
  - Angular
  - React Native (Expo)
- **IDE Integration** - Automatic project opening in:
  - VS Code
  - Cursor
  - WebStorm
  - IntelliJ IDEA
  - Sublime Text
  - Atom
- **Cross-Platform Support** - Works on macOS, Windows, and Linux
- **Smart Path Handling** - Supports home directory expansion (~), relative and absolute paths
- **Input Validation** - Project name and path validation

#### Developer Experience

- **Zero Configuration** - Works out of the box
- **Modern Tooling** - Uses latest recommended tools (Vite instead of deprecated CRA)
- **Minimal Dependencies** - Only essential packages (inquirer)
- **Fast Setup** - Project ready in ~30 seconds

#### Project Structure

- Modular, maintainable codebase
- Comprehensive JSDoc comments
- Separation of concerns (config, utils, prompts, handlers)

### 📦 Dependencies

- `inquirer@^8.2.6` - Interactive CLI prompts

---

## [1.1.0] - 2024-12-09

Second majior release, comes with local project traking and command list all tracked project and perform action on selected project.

### ✨ Added - New features

#### Introduced Features

- **Tracking Crating Projects** - Track all the projects that get created through the tool using local json file system. **(No Cloud Servers)**
- **New List Command** - new sub command to list all tracked project and select project from them and perform actions related to that project.
  **Actions list**
  - 📂 Open in IDE
  - 📋 Copy path
  - 🗑️  Remove from tracking
  - ℹ️  Show details

### 📦 Release Dependencies

- `commander@^11.1.0` - node.js command-line interfaces

---

## Migration Guide

### Migrating from 1.0.0 to v1.1.0

This rease added new features on top of the core features that released, no migration is needed. Just update or install and start using!

```bash
npm update -g projxo
pxo
```
or

```bash
npm uninstall -g projxo
npm install -g projxo
pxo
```

### Migrating to v1.0.0

Since this is the initial release, no migration is needed. Just install and start using!

```bash
npm install -g projxo
pxo
```

---

### Breaking Changes

No breaking changes

---

## Deprecations

None

---

## Security

- No known security vulnerabilities
- Dependencies regularly updated
- Data collection only about project details and saved localy in user's computer.
- No external requests (except npm registry for package downloads)

---

## Contributors

- Sasanga Chathumal

---

## Links

- [GitHub Repository](https://github.com/sasangachathumal/ProjXO)
- [npm Package](https://www.npmjs.com/package/ProjXO)
- [Issue Tracker](https://github.com/sasangachathumal/ProjXO/issues)
- [Documentation](https://github.com/sasangachathumal/ProjXO#readme)

---

## Support

If you encounter any issues or have suggestions:

- 🐛 [Report a bug](https://github.com/sasangachathumal/ProjXO/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/sasangachathumal/ProjXO/issues/new?template=feature_request.md)
- 💬 [Start a discussion](https://github.com/sasangachathumal/ProjXO/discussions)

---

**Legend:**

- ✨ Added - New features
- 🔧 Changed - Changes in existing functionality
- 🗑️ Deprecated - Soon-to-be removed features
- 🐛 Fixed - Bug fixes
- 🔒 Security - Security fixes
- 📝 Documentation - Documentation changes
