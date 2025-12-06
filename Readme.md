# ProjXO

> **Quick project setup CLI for modern web frameworks**  
> Stop wasting time with repetitive project scaffolding. Create production-ready projects in seconds.

[![npm version](https://img.shields.io/npm/v/projxo.svg)](https://www.npmjs.com/package/projxo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Why ProjXO?

As developers, we create new projects constantly—prototypes, client work, side projects, experiments. But every time, we go through the same tedious process:

```bash
# The old way (too many steps!)
npx create-vite my-app
cd my-app
npm install
code .
```

**ProjXO does it all in one interactive command:**

```bash
pxo
```

That's it. Pick your framework, name your project, choose where it goes, and you're coding in seconds.

---

## ✨ Features

- **🎯 One Command Setup** - Interactive CLI guides you through everything
- **⚡ Latest Tools** - Uses current best practices (Vite, not deprecated CRA)
- **🎨 Multiple Frameworks** - React, Next.js, Angular, React Native
- **🔧 IDE Integration** - Auto-opens in VS Code, Cursor, WebStorm, etc.
- **🌍 Cross-Platform** - Works on macOS, Windows, and Linux
- **💨 Zero Config** - No setup files, no configuration needed

---

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g projxo
```

Now use from anywhere:

```bash
pxo
```

### npx (No Install)

```bash
npx projxo
```

---

## 🎯 Quick Start

### Create Your First Project

```bash
pxo
```

That's it! The CLI will:

1. Ask what framework you want (React, Next.js, Angular, or React Native)
2. Ask for your project name
3. Ask where to create it
4. Ask which IDE to open it in
5. Create the project and open it

**Total time: ~30 seconds** ⚡

---

## 🛠️ Supported Project Types

### React + Vite (JavaScript)

Modern React development with Vite's lightning-fast HMR

```bash
pxo
# Select: React + Vite
```

**Includes:**

- React 18+
- Vite 5+
- ESLint configuration
- Fast Refresh

### React + Vite (TypeScript)

Type-safe React with Vite

```bash
pxo
# Select: React + Vite (TypeScript)
```

**Includes:**

- Everything from React + Vite
- TypeScript 5+
- Type definitions

### Next.js

Production-ready React framework

```bash
pxo
# Select: Next.js
```

**Includes:**

- Next.js 14+ (App Router)
- TypeScript support
- ESLint + Prettier
- Optimized build setup

### Angular

Enterprise-grade framework

```bash
pxo
# Select: Angular
```

**Includes:**

- Angular 17+
- TypeScript
- Angular CLI tools
- Testing setup

### React Native (Expo)

Mobile apps with React

```bash
pxo
# Select: React Native (Expo)
```

**Includes:**

- Expo SDK
- TypeScript support
- Development tools
- Platform-specific configurations

---

## 🎨 IDE Integration

ProjXO can automatically open your project in your preferred IDE:

### Supported IDEs

- **VS Code** - `code` command
- **Cursor** - `cursor` command
- **WebStorm** - `webstorm` command
- **IntelliJ IDEA** - `idea` command
- **Sublime Text** - `subl` command
- **Atom** - `atom` command

### Setup IDE Command-Line Tools

**VS Code:**

1. Open VS Code
2. Press `Cmd/Ctrl + Shift + P`
3. Type "Shell Command: Install 'code' command in PATH"
4. Done!

**Cursor:**
Usually available after installation

**WebStorm/IntelliJ:**
Tools → Create Command-line Launcher

**Others:**
Refer to your IDE's documentation

---

## 📖 Usage Examples

### Example 1: Enterprise Web App

```bash
pxo

# Select: Angular
# Name: my-ent-app
# Directory: ~/projects
# IDE: VS Code

# Project created and opened in VS Code!
# Start: npm run dev
```

### Example 2: Landing Page

```bash
pxo

# Select: React + Vite
# Name: my-landing-page
# Directory: ~/projects
# IDE: VS Code

# Project created and opened in VS Code!
# Start: npm run dev
```

### Example 3: Full-Stack App

```bash
pxo

# Select: Next.js
# Name: my-saas-app
# Directory: ~/work
# IDE: Cursor

# Next.js project with TypeScript ready!
# Start: npm run dev
```

### Example 4: Mobile App

```bash
pxo

# Select: React Native (Expo)
# Name: my-mobile-app
# Directory: ~/apps
# IDE: VS Code

# Expo project ready!
# Start: npx expo start
```

---

## ⚙️ Configuration

ProjXO works out of the box with zero configuration. However, you can customize some behaviors:

### Default Directory

ProjXO uses your current directory by default. Change it during the prompt or `cd` to your preferred location first:

```bash
cd ~/projects
pxo
```

### Skip IDE Opening

If you prefer to open projects manually:

```bash
pxo
# Select: Skip (open manually)
```

---

## 🎓 Tips & Best Practices

### Tip 1: Use Consistent Naming

```bash
# Good naming conventions
my-project-name    ✓
my_project_name    ✓
MyProjectName      ✓

# Avoid
my project name    ✗ (spaces)
my-project-name!   ✗ (special chars)
```

### Tip 2: Organize Projects

```bash
# Keep projects organized by type
~/projects/clients/
~/projects/personal/
~/projects/experiments/

# Use ProjXO in each folder
cd ~/projects/clients
pxo
```

### Tip 3: Learn the Frameworks

ProjXO uses official tools:

- **React + Vite**: [vitejs.dev/guide](https://vitejs.dev/guide/)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Angular**: [angular.io/docs](https://angular.io/docs)
- **Expo**: [docs.expo.dev](https://docs.expo.dev)

### Tip 4: Post-Setup Tasks

After project creation:

**For all projects:**

```bash
cd your-project
git init
git add .
git commit -m "Initial commit"
```

**Add common packages:**

```bash
# For React projects
npm install axios react-query zustand

# For styling
npm install tailwindcss @shadcn/ui

# For forms
npm install react-hook-form zod
```

---

## 🚨 Troubleshooting

### Issue: Command not found

**Problem:** `pxo: command not found`

**Solution:**

```bash
# Reinstall globally
npm install -g projxo

# Or use full path
npx projxo
```

### Issue: Permission denied

**Problem:** `EACCES: permission denied`

**Solution (macOS/Linux):**

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Then reinstall
npm install -g projxo
```

**Solution (Windows):**
Run terminal as Administrator

### Issue: IDE doesn't open

**Problem:** IDE selected but doesn't open

**Solution:**

1. Ensure IDE is installed
2. Set up command-line tools (see IDE Integration section)
3. Test command manually:

   ```bash
   code .  # for VS Code
   cursor . # for Cursor
   ```

### Issue: Project creation fails

**Problem:** Error during project creation

**Solutions:**

- **Check internet connection** - npm needs to download packages
- **Clear npm cache** - `npm cache clean --force`
- **Update Node.js** - Ensure Node.js >= 14.0.0
- **Check disk space** - Ensure enough space for node_modules

---

## 🔧 Requirements

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0 (comes with Node.js)
- **Internet connection** (for downloading packages)

### Check Your Versions

```bash
node --version   # Should be >= 14.0.0
npm --version    # Should be >= 6.0.0
```

### Update Node.js

**Using nvm (recommended):**
```bash
nvm install 20
nvm use 20
```

**Direct download:**
[nodejs.org/download](https://nodejs.org/download)

---

## 🤝 Contributing

ProjXO is open source and contributions are welcome!
To make thing easy and manageable use PR (pull requests) as much as possible.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🔧 Submit pull requests

### Development Setup

```bash
# Clone the repository
git clone https://github.com/sasangachathumal/ProjXO.git
cd ProjXO

# Install dependencies
npm install

# Test locally
node index.js

# Test globally
npm link
pxo
```

### Project Structure

```
ProjXO/
├── index.js                 # Entry point
├── package.json
└── src/
    ├── cli.js              # Main CLI logic
    ├── config/             # Framework & IDE configs
    ├── utils/              # Helper functions
    ├── prompts/            # User prompts
    └── handlers/           # Business logic
```

---

## 📝 License

MIT © Sasanga Chathumal

See [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

ProjXO uses these amazing tools:

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Next.js](https://nextjs.org/) - React framework
- [Angular CLI](https://angular.io/cli) - Angular development tools
- [Expo](https://expo.dev/) - React Native framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive CLI prompts

---

## 🗺️ Roadmap

### Current Version (v1.0.0)

- ✅ Interactive project creation
- ✅ 5 framework templates
- ✅ IDE integration
- ✅ Cross-platform support

### Planned Features

- 🔄 Project tracking and quick access
- 🔄 Bookmarking favorite projects
- 🔄 Custom project templates
- 🔄 Post-setup automation (install common packages)
- 🔄 Git options
- 🔄 Team templates sharing

---

## 💬 Support

### Get Help

- 📖 [Documentation](https://github.com/sasangachathumal/ProjXO#readme)
- 🐛 [Issue Tracker](https://github.com/sasangachathumal/ProjXO/issues)
- 💬 [Discussions](https://github.com/sasangachathumal/ProjXO/discussions)

### Stay Updated

- ⭐ [Star on GitHub](https://github.com/sasangachathumal/ProjXO)
- 🐦 [Follow on X](https://x.com/SasangaChathum1)
- 💼 [Follow on linkedIn](https://www.linkedin.com/in/sasanga-chathumal/)
- 📋 [Follow on facebook](https://www.facebook.com/profile.php?id=61582131982373)
- 📧 [Email](mailto:devbysasanga@gmail.com)

---

## ⚡ Quick Reference

```bash
# Create new project
pxo

# Check version
pxo --version

# Get help
pxo --help

# Use without installing
npx projxo
```

---

## 📊 Comparison

### ProjXO vs Manual Setup

| Task | Manual | ProjXO |
|------|--------|--------|
| Choose framework | Research docs | Interactive selection |
| Run create command | Remember exact command | Handled automatically |
| Navigate to project | `cd` manually | Automatic |
| Open in IDE | `code .` manually | Automatic |
| **Total time** | **3-5 minutes** | **30 seconds** |

### ProjXO vs Other Tools

| Feature | ProjXO | create-* tools | Yeoman |
|---------|--------|----------------|---------|
| Interactive | ✅ | ⚠️ Varies | ✅ |
| Multi-framework | ✅ | ❌ Single | ⚠️ Depends |
| IDE Integration | ✅ | ❌ | ❌ |
| Zero config | ✅ | ✅ | ❌ |
| Modern tools | ✅ | ⚠️ Some outdated | ⚠️ Many outdated |

---

## 🔗 Links

- **npm**: [npmjs.com/package/ProjXO](https://www.npmjs.com/package/ProjXO)
- **GitHub**: [github.com/sasangachathumal/ProjXO](https://github.com/sasangachathumal/ProjXO)
- **Issues**: [github.com/sasangachathumal/ProjXO/issues](https://github.com/sasangachathumal/ProjXO/issues)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⭐ Star on GitHub](https://github.com/sasangachathumal/ProjXO) • [📦 npm Package](https://www.npmjs.com/package/ProjXO) • [🐛 Report Bug](https://github.com/sasangachathumal/ProjXO/issues)

</div>