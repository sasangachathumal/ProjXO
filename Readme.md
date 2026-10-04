# ProjXO

One command, Any framework

> **Quick project setup and management CLI for modern web frameworks**
> Create projects in seconds. Track and open them instantly.

[![npm version](https://img.shields.io/npm/v/projxo.svg)](https://www.npmjs.com/package/projxo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Quick Start

```bash
# Install globally
npm install -g projxo

# Create a new project
pxo

# Track an existing project
pxo track ~/projects/my-existing-app

# List all your projects
pxo list

# Open a project instantly
pxo open my-app

# Show recently accessed projects
pxo recent

# View project statistics
pxo stats
```

**That's it!** Pick your framework, name your project, and start coding.

---

## ✨ What is ProjXO?

**Create projects. Track them. Never lose them.**

ProjXO eliminates the repetitive setup process for new projects and keeps all your work organized in one place. Instead of:

```bash
npx create-vite my-app
cd my-app
npm install
code .
# Wait... where did I save that other project?
```

You get:

```bash
pxo                      # Create & auto-track new projects
pxo track ~/old-project  # Track projects you already have
pxo list                 # See all your projects
pxo open my-app          # Open instantly by name
pxo recent               # See recently accessed projects
pxo stats                # View project statistics
```

**One tool. Zero hassle.**

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
| ------- | ----- | ----------- |
| `pxo` | — | Create a new project with interactive setup |
| `pxo track [path]` | — | Add an existing project to tracking |
| `pxo list` | `pxo ls` | Browse and manage all tracked projects |
| `pxo recent [limit]` | — | Browse recently accessed projects |
| `pxo open <project-name>` | — | Quick open project by name |
| `pxo stats` | — | View project statistics |
| `pxo --version` | `pxo -V` | Show version number |
| `pxo --help` | `pxo -h` | Display help information |

---

### Create New Project

```bash
pxo
```

**Interactive prompts guide you through:**

1. Framework selection
2. Project name
3. Location
4. IDE preference

#### Supported Frameworks

| Framework | Description |
| --------- | ----------- |
| **Angular** | Latest Angular CLI |
| **Ionic + React** | Mobile apps with Ionic and React |
| **Ionic + Angular** | Mobile apps with Ionic and Angular |
| **Ionic + Vue** | Mobile apps with Ionic and Vue |
| **Next.js** | App Router, TypeScript |
| **Next.js + shadcn/ui** | Next.js pre-configured with shadcn/ui |
| **Nuxt.js** | Vue.js framework for production |
| **React + Vite** | JavaScript or TypeScript |
| **React Native** | Expo |

#### Supported IDEs

ProjXO auto-opens your project in the IDE of your choice:

| IDE | CLI Command |
| --- | ----------- |
| VS Code | `code` |
| Cursor | `cursor` |
| WebStorm | `webstorm` |
| IntelliJ IDEA | `idea` |
| Sublime Text | `subl` |
| Atom | `atom` |

**Setting up VS Code CLI:**

1. Open Command Palette (`Cmd/Ctrl+Shift+P`)
2. Type: `Shell Command: Install 'code' command in PATH`

For other IDEs, check your IDE's documentation for CLI setup.

---

### Track Existing Project

```bash
pxo track [path]
```

**Add any project that wasn't created through ProjXO** to your tracking list, so you can open it with `pxo open` or manage it via `pxo list`.

**Auto-detection:** ProjXO scans config files and `package.json` dependencies to automatically identify the framework, language, package manager, and project name.

```bash
# Track current directory
pxo track

# Track a specific path
pxo track ~/projects/my-existing-app
pxo track /absolute/path/to/project
```

#### Track Command Flags

| Flag | Description |
| ---- | ----------- |
| `-m, --manual` | Skip auto-detection, enter details manually |
| `-y, --yes` | Skip all confirmation prompts |
| `--no-ide` | Skip IDE preference question |
| `--ide <ide>` | Set IDE directly (`vscode`, `cursor`, `webstorm`, etc.) |
| `-f, --force` | Re-track a project even if already tracked |

#### Auto-Detection Example

```bash
$ pxo track ~/projects/my-existing-app

🔍 Detecting project...

✓ Project detected:

  Name:        my-existing-app
  Type:        nextjs
  Language:    TypeScript
  Path:        /Users/me/projects/my-existing-app
  Confidence:  95%

? Add "my-existing-app" (nextjs) to tracking? Yes
? Default IDE for this project: VS Code

✓ Added my-existing-app to tracking

Quick access:
  pxo open my-existing-app
  pxo list
```

#### Manual Mode

When auto-detection can't identify the framework, or for non-JavaScript projects:

```bash
$ pxo track ~/projects/my-api --manual

📝 Manual tracking mode

? Enter project name: my-api
? Select project type: Custom/Other
? Enter custom project type: fastapi
? Select primary language: Other
? Default IDE for this project: VS Code

✓ Added my-api to tracking
```

---

### List All Projects

```bash
pxo list
# or
pxo ls
```

Browse all tracked projects and take action on any of them.

**Interactive actions:**

- 📂 Open in IDE
- 📋 Copy project path
- 🗑️ Remove from tracking
- ℹ️ Show detailed info

**Example output:**

```bash
📦 Your Projects (5)

❯ my-awesome-app     React+Vite    2 hours ago
  client-dashboard   Next.js       1 day ago
  mobile-game        React Native  3 days ago
  legacy-project     Angular       1 week ago
  test-app           React+Vite    2 weeks ago

Use ↑↓ to navigate • Enter to select
```

---

### Recent Projects

```bash
pxo recent
# or with custom limit
pxo recent 5
```

Show recently accessed projects (default: last 10), sorted by last accessed time.

**Example output:**

```bash
🕐 Recent Projects (5)

Select a project to open:
❯ 1.  my-awesome-app      React+Vite    2 hours ago
  2.  client-dashboard    Next.js       1 day ago
  3.  mobile-game         React Native  3 days ago
  4.  api-server          Next.js       5 days ago
  5.  test-project        React+Vite    1 week ago
```

---

### Quick Open Project

```bash
pxo open <project-name>
```

Instantly open a project by name — the fastest way to get back to work.

- Exact name match opens immediately
- Partial name triggers fuzzy search
- Multiple matches show a selection menu
- Updates last accessed timestamp

**Example:**

```bash
# Exact match
pxo open my-awesome-app

# Fuzzy match — finds "client-dashboard"
pxo open dash

# Multiple matches — shows selection menu
pxo open app
```

---

### View Statistics

```bash
pxo stats
```

View a summary of all your tracked projects.

- Total project count
- Count and percentage breakdown by framework type
- Most used IDE
- Newest and oldest project dates

**Example output:**

```bash
$ pxo stats

📊 Project Statistics
===========================

Total Projects:     12

Projects by Type:
  react-vite           2 (17%)  ███
  react-vite-ts        1 (8%)   █
  nextjs               2 (17%)  ███

Most Used IDE:      VS Code

Recent Activity:
  Newest:  my-app (Jan 8, 2026)
  Oldest:  first-project (Dec 8, 2025)
```

---

### Version & Help

```bash
pxo --version
pxo --help
```

---

## 📖 Usage Examples

### Example 1: Create a New Project

```bash
$ pxo

? Select project type: React + Vite (TypeScript)
? Enter project name: my-landing-page
? Enter directory: ~/projects
? Select IDE: VS Code

✓ Project created successfully!
✓ Project added to tracking

cd ~/projects/my-landing-page
npm run dev
```

### Example 2: Track Your Existing Projects

```bash
# You already have projects from before using ProjXO
$ pxo track ~/projects/client-dashboard

🔍 Detecting project...

✓ Project detected:

  Name:        client-dashboard
  Type:        nextjs
  Language:    TypeScript
  Confidence:  95%

? Add "client-dashboard" (nextjs) to tracking? Yes
? Default IDE for this project: VS Code

✓ Added client-dashboard to tracking
```

### Example 3: Daily Workflow

```bash
# Morning: See what you worked on recently
$ pxo recent
# → Select and open your active project

# Switch projects quickly
$ pxo open client-dashboard
✓ Opened client-dashboard

# End of day: Review all projects
$ pxo list
# → Browse, open, or manage your projects
```

---

## 💡 Tips & Tricks

### Track All Your Existing Projects at Once

```bash
# Already have projects? Track them one by one:
pxo track ~/projects/project-one
pxo track ~/projects/project-two

# Or track the current directory:
cd ~/projects/my-project
pxo track
```

### Use Recent for Active Work

```bash
# Working on multiple projects?
pxo recent

# Shows only what you've touched recently —
# much faster than scrolling through the full list
```

### Quick Open for Speed

```bash
# If you know the name, use open:
pxo open my-app

# Partial names work too (fuzzy search):
pxo open dash   # finds "client-dashboard"
```

### Automate Tracking in Scripts

```bash
# Use flags to skip prompts in scripts or CI:
pxo track ~/projects/my-app --yes --ide vscode
```

### Organize Projects by Directory

```bash
# Keep projects grouped by purpose:
~/projects/clients/
~/projects/personal/
~/projects/learning/

# Create new projects in the right place:
cd ~/projects/clients
pxo
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

### Tracking Existing Projects

For projects created before using ProjXO, use `pxo track`:

```bash
pxo track ~/projects/my-existing-app
# Auto-detects framework, name, and language
✓ Added my-existing-app to tracking
```

### What's Stored

- Project name and path
- Framework type
- Creation and last accessed timestamps
- IDE preference

**Privacy:** All data stays local on your machine (`~/.projxo/projects.json`). No cloud sync, no telemetry.

---

## 🚨 Troubleshooting

### Command Not Found

```bash
# Reinstall globally
npm install -g projxo

# Or run with npx
npx projxo
```

### Permission Errors (macOS/Linux)

```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
npm install -g projxo
```

### IDE Doesn't Open

1. Verify the IDE is installed
2. Set up CLI tools (see [Supported IDEs](#supported-ides))
3. Test manually: `code .` or `cursor .`

### Projects Not Showing in List

Projects created before v1.1.0 were not automatically tracked. Use `pxo track` to add them:

```bash
pxo track ~/projects/my-old-project
```

### Project Not Found with `pxo open`

```bash
# See exact names in the list
pxo list

# Or try a partial name (fuzzy search)
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

# Test locally
node index.js
# or link globally
npm link
pxo
```

---

## 📝 License

MIT © Sasanga Chathumal

---

## 🙏 Credits

Built with:

- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [Commander.js](https://github.com/tj/commander.js)
- [Vite](https://vitejs.dev/)
- [Next.js](https://nextjs.org/)
- [Angular CLI](https://angular.io/cli)
- [Expo](https://expo.dev/)

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

# Track existing project
pxo track
pxo track ~/projects/my-app
pxo track ~/projects/my-app --yes --ide vscode
pxo track ~/projects/my-app --manual

# List projects
pxo list
pxo ls

# Recent projects
pxo recent
pxo recent 5

# Quick open
pxo open <project-name>

# Statistics
pxo stats

# Version & help
pxo --version
pxo --help
```

---

Stop wasting time on setup. Start building.

[⭐ Star on GitHub](https://github.com/sasangachathumal/ProjXO) • [📦 Install Now](https://www.npmjs.com/package/projxo) • [🐛 Report Issue](https://github.com/sasangachathumal/ProjXO/issues)
