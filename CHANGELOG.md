# Changelog

All notable changes to ProjXO will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-12-06

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

### 🛠️ Technical Details

- **Node.js** >= 14.0.0 required
- **Package size**: ~5MB
- **Entry point**: Single command (`pxo`)

---

## [Unreleased]

### 🔮 Planned Features

#### v1.1.0

- Project tracking and database
- Quick access commands (`pxo list`, `pxo recent`, `pxo open`)
- Project bookmarking
- Project statistics
- Fuzzy search for project names

#### v1.2.0

- Custom project templates
- Post-setup automation (install common packages)
- Git options
- Environment variables setup

#### v1.3.0

- Team templates sharing
- Cloud synchronization
- Project groups/workspaces
- Component generator

#### Future Considerations

- Web dashboard
- VSCode extension
- GitHub/GitLab integration
- AI-powered suggestions
- Migration tools (CRA to Vite, etc.)

---

## Version History

### Release Notes

#### v1.0.0 - First Stable Release

This is the first production-ready release of ProjXO. It includes all core features needed for quick project scaffolding with modern frameworks.

**Key Highlights:**

- Supports 5 popular frameworks
- Automatic IDE integration
- Cross-platform compatibility
- Zero configuration required

**Why v1.0.0?**

- All planned core features implemented
- Thoroughly tested on macOS, Windows, Linux
- Stable API (no breaking changes expected)
- Ready for production use

---

## Migration Guide

### Migrating to v1.0.0

Since this is the initial release, no migration is needed. Just install and start using!

```bash
npm install -g projxo
pxo
```

---

## Breaking Changes

### v1.0.0
No breaking changes (initial release)

---

## Deprecations

### v1.0.0
None (initial release)

---

## Security

### v1.0.0

- No known security vulnerabilities
- Dependencies regularly updated
- No data collection or external requests (except npm registry for package downloads)

---

## Contributors

### v1.0.0

- Initial development and release

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
