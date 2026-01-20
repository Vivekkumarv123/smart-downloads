# Smart Downloads Manager – ES6+ Node.js CLI Utility

## Problem Statement

Your Downloads folder gets cluttered with PDFs, images, videos, code files, and installers. Manually sorting files is time-consuming, error-prone, and breaks workflow. You need a safe, automated, and customizable solution to organize files efficiently.

## Solution

Smart Downloads Manager is a cross-platform CLI tool that:

- Scans your Downloads folder
- Categorizes files based on type or custom mapping
- Moves files into organized folders (Documents, Images, Videos, Archives, Installers, Code)
- Prevents overwriting with safe auto-renaming
- Supports dry-run mode to simulate changes
- Allows file age filtering (only move files older than N days)
- Optional custom JSON configuration for personalized folder mappings
- Fully ES6+ and modular, using Node.js standard libraries

This tool solves a real-life problem and can be extended for any folder organization task.

## Tech Stack

- **Node.js** (v14+)
- **ES6+** syntax (import/export, arrow functions, template literals)
- **Standard Node.js libraries**: fs, path, os
- **CLI argument parsing** with yargs (optional, standard)

## Features

| Feature | Description |
|---------|-------------|
| Dry-run mode | Simulate file organization without moving files (`--dry-run`) |
| Custom mapping | Use your own folder mapping via JSON (`--config=config.json`) |
| File age filter | Only organize files older than N days (`--days=N`) |
| Safe renaming | Avoid overwriting files with automatic renaming |
| Cross-platform | Works on Windows, Mac, and Linux |
| Modular ES6+ code | Easy to maintain, extend, and understand |

## File Structure

```
smart-downloads/
├── index.js          # CLI entry point
├── organizer.js      # Core logic
├── fileTypes.js      # Default folder mapping
├── utils.js          # Safe rename helper
├── config.json       # Optional custom mapping
├── package.json
├── README.md
└── screenshots/      # Before/After images
```

## How to Run

### Install dependencies (for CLI arguments):

```bash
npm install yargs
```

### Basic run:

```bash
node index.js
```

### Dry-run mode (simulate changes):

```bash
node index.js --dry-run
```

### Organize files older than N days:

```bash
node index.js --days=2
```

### Use custom mapping:

```bash
node index.js --config
```

### Combine options:

```bash
node index.js --dry-run --days=3 --config
```

**Always test with `--dry-run` first.**

## Sample Output

```
📂 Smart Downloads Organizer

✔ report.pdf → Documents/
✔ image.png → Images/
✔ project.zip → Archives/
✔ setup.exe → Installers/
✔ auto-form.py → Code/

✅ Operation complete!
```

## Design Decisions

- **ES6+ modular design**: Cleaner code, easier maintenance
- **Dry-run mode**: Safe testing before actual organization
- **File age filtering**: Avoids moving recent downloads
- **Safe renaming**: Prevents accidental overwrites
- **Custom mapping**: Makes the tool flexible for personal workflow
