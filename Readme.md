# ProjXO CLI

**One command. Any framework.**

**`Project experience, optimised`**

A cross-platform CLI tool to quickly create and setup new projects for React, Next.js, Angular, and React Native with automatic IDE integration.

## Features

✅ **Cross-platform** - Works on macOS, Windows, and Linux  
✅ **Modern tooling** - Uses latest recommended commands (Vite for React, not deprecated CRA)  
✅ **IDE integration** - Automatically opens projects in VS Code, Cursor, WebStorm, etc.  
✅ **Zero dependencies** - Uses only Node.js built-in modules  
✅ **Interactive** - User-friendly prompts guide you through setup  

## Supported Project Types

| Type | Command Used | Notes |
|------|-------------|-------|
| **React + Vite** | `npm create vite@latest` | Modern React with Vite (JS) |
| **React + Vite (TS)** | `npm create vite@latest` | TypeScript variant |
| **Next.js** | `npx create-next-app@latest` | Full-stack React framework |
| **Angular** | `npx @angular/cli new` | Enterprise framework |
| **React Native** | `npx create-expo-app` | Mobile apps with Expo |

## Installation

### Option 1: Global Installation (Recommended)

```bash
# Clone or download the files
# Then in the project directory:
npm install -g .

# Now use from anywhere:
projxo
# or the short alias:
ds
```

### Option 2: Local Installation

```bash
# Run directly without installing:
node /path/to/projxo/index.js

# Or create an alias in your shell:
# For bash/zsh (~/.bashrc or ~/.zshrc):
alias projxo="node /path/to/projxo/index.js"
alias ds="node /path/to/projxo/index.js"
```

### Option 3: npx

```bash
npx projxo
```

## Usage

Simply run the command and follow the interactive prompts:

```bash
projxo
```

Or with the short alias:

```bash
ds
```

### Interactive Prompts

1. **Select project type** - Choose from React/Vite, Next.js, Angular, or React Native
2. **Enter project name** - Your project's name (e.g., "my-app")
3. **Choose directory** - Where to create the project (default: current directory)
4. **Select IDE** - Auto-open in VS Code, Cursor, WebStorm, etc., or skip

### Example Session

```
=== ProjXO - Quick Project Setup ===

Available project types:
  1. React + Vite (react-vite)
  2. React + Vite (TypeScript) (react-vite-ts)
  3. Next.js (nextjs)
  4. Angular (angular)
  5. React Native (Expo) (react-native)

Select project type (1-5): 1

✓ Selected: React + Vite

Enter project name: my-awesome-app

Enter directory (default: /Users/you/development): 

Available IDEs:
  1. VS Code (vscode)
  2. Cursor (cursor)
  3. WebStorm (webstorm)
  ...

Select IDE to open (1-7): 1

==================================================
Starting project creation...
==================================================

✓ Project created successfully!

Opening project in VS Code...
✓ Project opened in VS Code

Project location:
  /Users/you/development/my-awesome-app

Next steps:
  cd /Users/you/development/my-awesome-app
  npm run dev
```

## Supported IDEs

- **VS Code** - `code` command
- **Cursor** - `cursor` command  
- **WebStorm** - `webstorm` command
- **IntelliJ IDEA** - `idea` command
- **Sublime Text** - `subl` command
- **Atom** - `atom` command

**Note:** IDEs must be installed and available in your system PATH. See IDE-specific documentation for adding command-line tools.

## Requirements

- **Node.js** >= 14.0.0
- **npm** (comes with Node.js)
- **inquirer** >=8.2.6

## Troubleshooting

### "Command not found" error for IDE

Make sure the IDE's command-line tool is installed and in your PATH:

- **VS Code**: Install "Shell Command: Install 'code' command in PATH" from Command Palette
- **Cursor**: Usually available after installation
- **WebStorm/IDEA**: Enable in Tools → Create Command-line Launcher

### Project creation fails

- Ensure you have a stable internet connection
- Check Node.js version: `node --version` (should be >= 14)
- Try running with `sudo` on macOS/Linux if permission issues occur
- On Windows, run terminal as Administrator if needed

### Path issues on Windows

Use forward slashes or escape backslashes in paths:
```
C:/Users/YourName/development
# or
C:\\Users\\YourName\\development
```

## Why Node.js over Python/Shell?

1. **Native npm integration** - You're already working with npm-based tools
2. **True cross-platform** - No platform-specific code needed
3. **Easy distribution** - `npm install -g` works everywhere
4. **No context switching** - Same language as your projects
5. **Rich ecosystem** - Can add features like `inquirer`, `chalk`, etc.

## License

MIT

## Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Author

Created by Sasanga Chathumal
