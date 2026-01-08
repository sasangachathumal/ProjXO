# ProjXO

**One command, Any framework**

> **Quick project setup and management CLI for modern web frameworks**  
> Create projects in seconds. Never lose track of them again.

[![npm version](https://img.shields.io/npm/v/projxo.svg)](https://www.npmjs.com/package/projxo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Quick Start

```bash
# Install globally
npm install -g projxo

# Create a new project
pxo

# List all your projects
pxo list

# Open a project quickly
pxo open my-app

# List all your recently accessed projects
pxo recent

# View stats of the your projects
pxo stats
```

**That's it!** Pick your framework, name your project, and start coding.

---

## ✨ What is ProjXO?

**Create projects. Track them. Never lose them.**

ProjXO eliminates the repetitive setup process for new projects. Instead of:

```bash
npx create-vite my-app
cd my-app
npm install
code .
# Wait... where did I save that other project?
```

You get:

```bash
pxo              # Create & track projects
pxo list         # See all your projects
pxo open my-app  # Open instantly
pxo recent       # See all recent projects
pxo stats        # See stats of all projects
```

**One command. Zero hassle.**

---

## 📦 Installation

```bash
npm install -g projxo
```

**Requirements:**

- Node.js >= 14.0.0
- npm >= 6.0.0

---

## 🛠️ Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `pxo` | - | Create a new project with interactive setup |
| `pxo list` | `pxo ls` | Browse and manage all tracked projects |
| `pxo recent [limit]` | - | Browse recently accessed projects |
| `pxo open <project-name>` | - | Quick open project by name |
| `pxo stats` | - | View statistics of the projects created |
| `pxo --version` | `pxo -V` | Show version number |
| `pxo --help` | `pxo -h` | Display help information |

---

### Create New Project

```bash
pxo
```

**Interactive prompts guide you through:**

1. Framework selection (React, Next.js, Angular, React Native)
2. Project name
3. Location
4. IDE preference

#### **Supported frameworks:**

- **Angular** (Latest version)
- **Ionic + React** (Mobile apps)
- **Ionic + Angular** (Mobile apps)
- **Ionic + Vue** (Mobile apps)
- **Next.js** (App Router, TypeScript)
- **Next.js + shadcn/ui** (Pre-configured with shadcn components)
- **Nuxt.js** (Vue.js framework)
- **React + Vite** (JavaScript or TypeScript)
- **React Native** (Expo)

#### **Supported IDEs:**

ProjXO auto-opens projects in your preferred IDE:

- **VS Code** (`code`)
- **Cursor** (`cursor`)
- **WebStorm** (`webstorm`)
- **IntelliJ IDEA** (`idea`)
- **Sublime Text** (`subl`)
- **Atom** (`atom`)

**Setup command-line tools:**

**VS Code:**

1. Open Command Palette (`Cmd/Ctrl+Shift+P`)
2. Type: "Shell Command: Install 'code' command in PATH"

**Other IDEs:** Check your IDE's documentation for CLI setup.

---

### List All Projects

```bash
pxo list
# or
pxo ls
```

**Shows all your tracked projects with:**

- Project name
- Framework type
- Last accessed time

**Interactive actions:**

Select a project and perform actions

- 📂 Open in IDE
- 📋 Copy project path
- 🗑️ Remove from tracking
- ℹ️ Show detailed info

**Example output:**

``` bash
📦 Your Projects (5)

❯ my-awesome-app     React+Vite    2 hours ago
  client-dashboard   Next.js       1 day ago
  mobile-game        React Native  3 days ago
  legacy-project     Angular       1 week ago
  test-app           React+Vite    2 weeks ago

Use ↑↓ to navigate • Enter to select
```

### Recent Projects

```bash
pxo recent
# or with custom limit
pxo recent 5
```

***Shows your recently accessed projects (default: last 10)***

**Features:**

- Sorted by last accessed time (most recent first)
- Quick selection with arrow keys
- Select to open in your preferred IDE

**Example output:**

``` bash
🕐 Recent Projects (5)

Select a project to open:
❯ 1.  my-awesome-app      React+Vite    2 hours ago
  2.  client-dashboard    Next.js       1 day ago
  3.  mobile-game         React Native  3 days ago
  4.  api-server          Next.js       5 days ago
  5.  test-project        React+Vite    1 week ago
```

**Use case:** Perfect for quickly switching between active projects without browsing the full list.

### Quick Open Project

```bash
pxo open <project-name>
```

**Instantly open a project by name** - the fastest way to access your work.

**Features:**

- Direct project opening by name
- Fuzzy search if exact match not found
- Opens in your preferred IDE
- Updates last accessed timestamp

**Example output:**

``` bash
# Exact match
pxo open my-awesome-app

# Fuzzy match (finds "my-awesome-app")
pxo open awesome

# Multiple matches - shows selection menu
pxo open app
```

```bash
$ pxo open dashboard

Found similar project: client-dashboard
✓ Opening client-dashboard in VS Code...
✓ Opened client-dashboard
```

**Use case:** When you know the project name, this is the fastest way to open it.

---

### View stats of projects

```bash
pxo stats
```

View status of projects created through projxo.

**Features:**

- View projects count
- View projects count and presentage by framework type
- View most used IDE
- View newest and oldest projects

**Example output:**

```bash
$ pxo stats

📊 Project Statistics
===========================

Total Projects:     12

Projects by Type:
  react-vite           2 (17%)  ███
  react-vite-ts        1 (8%)  █
  nextjs               2 (17%)  ███

Most Used IDE:      vscode

Recent Activity:
  Newest:  next-cn2-test (Jan 8, 2026)
  Oldest:  test-project-1765197012999 (Dec 8, 2025)
```

---

### Version & Help

```bash
# Check version
pxo --version

# Show help
pxo --help
```

---

## 📖 Usage Examples

### Example 1: Create React App

```bash
$ pxo

? Select project type: React + Vite
? Enter project name: my-landing-page
? Enter directory: ~/projects
? Select IDE: VS Code

✓ Project created successfully!
✓ Project added to tracking

# Start developing:
cd ~/projects/my-landing-page
npm run dev
```

---

### Example 2: Browse Your Projects

```bash
$ pxo list

📦 Your Projects (3)

❯ my-landing-page    React+Vite    just now
  my-nextjs-app      Next.js       2 days ago
  old-angular-app    Angular       2 weeks ago

# Select a project to:
# - Open in your IDE
# - Copy the path
# - Remove from tracking
# - View details
```

### Example 3: Quick Access Workflow

```bash
# Morning: See what you worked on recently
$ pxo recent
# → Select and open your active project

# Later: Quick open by name
$ pxo open client-dashboard
✓ Opened client-dashboard

# End of day: Browse all projects
$ pxo list
# → Review and organize
```

---

## 💡 Tips & Tricks

### Use Recent for Active Work

```bash
# Working on multiple projects?
pxo recent

# Shows only what you've touched recently
# Much faster than scrolling through all projects
```

### Quick Open for Speed

```bash
# If you remember the name, use open
pxo open my-app

# Fuzzy search helps with partial names
pxo open dash  # finds "client-dashboard"
```

### Organize Your Projects

```bash
# Keep projects organized
~/projects/clients/
~/projects/personal/
~/projects/learning/

# Create projects in the right place
cd ~/projects/clients
pxo
```

### Review Project Details

```bash
pxo list
# → Select project → Show details

# See full information:
# - Complete path
# - Creation date
# - Framework type
# - Default IDE
```

---

## 📊 How It Works

### Automatic Tracking

Every project you create with ProjXO is automatically tracked:

```bash
pxo
# Creates project...
✓ Project added to tracking

# Data stored in: ~/.projxo/projects.json
```

### What's Stored

- Project name and path
- Framework type
- Creation and last accessed timestamps
- IDE preference

**Privacy:** All data stays local on your machine. No cloud sync, no tracking.

---

## 🚨 Troubleshooting

### Command Not Found

```bash
# Reinstall globally
npm install -g projxo

# Or use with npx
npx projxo
```

### Permission Errors (macOS/Linux)

```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
npm install -g projxo
```

### IDE Doesn't Open

1. Verify IDE is installed
2. Setup command-line tools (see IDE Integration)
3. Test manually: `code .` or `cursor .`

### Projects Not Showing in List

**Projects created before v1.1.0 aren't tracked.**

Only projects created after installing v1.1.0+ are automatically tracked.

### Project Not Found (Open Command)

If `pxo open` can't find your project:

```bash
# Use list to see exact names
pxo list

# Or try partial name (fuzzy search)
pxo open partial-name
```

---

## 🤝 Contributing

Contributions are welcome! Please use pull requests.

**Ways to contribute:**

- 🐛 Report bugs
- 💡 Suggest features  
- 📖 Improve docs
- 🔧 Submit PRs

**Development setup:**

```bash
git clone https://github.com/sasangachathumal/ProjXO.git
cd ProjXO
npm install
node index.js    # Test locally
```

---

## 📝 License

MIT © Sasanga Chathumal

---

## 🙏 Credits

Built with:
- [Vite](https://vitejs.dev/)
- [Next.js](https://nextjs.org/)
- [Angular CLI](https://angular.io/cli)
- [Expo](https://expo.dev/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [Commander.js](https://github.com/tj/commander.js)

---

## 💬 Support & Links

- 📖 [Documentation](https://github.com/sasangachathumal/ProjXO#readme)
- 🐛 [Issues](https://github.com/sasangachathumal/ProjXO/issues)
- 💬 [Discussions](https://github.com/sasangachathumal/ProjXO/discussions)
- 📦 [npm Package](https://www.npmjs.com/package/projxo)

**Connect:**

- 🐦 [X/Twitter](https://x.com/SasangaChathum1)
- 💼 [LinkedIn](https://www.linkedin.com/in/sasanga-chathumal/)
- 📧 [Email](mailto:devbysasanga@gmail.com)

---

## ⚡ Quick Reference

```bash
# Create project
pxo

# List projects
pxo list
pxo ls

# Recent projects
pxo recent
pxo recent 5

# Quick open
pxo open <project-name>

# Version
pxo --version
pxo -V

# Help
pxo --help
pxo -h
```

---

<div align="center">

**Stop wasting time on setup. Start building.**

[⭐ Star on GitHub](https://github.com/sasangachathumal/ProjXO) • [📦 Install Now](https://www.npmjs.com/package/projxo) • [🐛 Report Issue](https://github.com/sasangachathumal/ProjXO/issues)

</div>