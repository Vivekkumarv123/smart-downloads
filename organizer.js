import fs from 'fs';
import path from 'path';
import { fileTypes } from './fileTypes.js';
import { getUniquePath } from './utils.js';

export const organizeDownloads = (downloadsPath, options = {}) => {
  const { dryRun = false, minAgeDays = 0, configPath } = options;

  const defaultConfigPath = path.join(process.cwd(), 'config.json');

let mapping = fileTypes;

if (configPath === true) {
  // user typed --config
  if (fs.existsSync(defaultConfigPath)) {
    mapping = JSON.parse(fs.readFileSync(defaultConfigPath, 'utf-8'));
  } else {
    throw new Error('config.json not found in project root');
  }
} else if (typeof configPath === 'string') {
  // user typed --config custom.json
  mapping = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}


  const files = fs.readdirSync(downloadsPath);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const summary = {
    totalFiles: 0,
    folders: {}
  };

  files.forEach(file => {
    const fullPath = path.join(downloadsPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) return;

    const stats = fs.statSync(fullPath);
    const fileDate = new Date(stats.mtimeMs);
    const ageInDays = Math.floor(
      (todayStart - fileDate) / (1000 * 60 * 60 * 24)
    );

    if (ageInDays < minAgeDays) return;

    const ext = path.extname(file).toLowerCase();
    let targetFolder = 'Others';

    for (const [folder, extensions] of Object.entries(mapping)) {
      if (extensions.includes(ext)) {
        targetFolder = folder;
        break;
      }
    }

    summary.totalFiles++;
    summary.folders[targetFolder] =
      (summary.folders[targetFolder] || 0) + 1;

    const targetDir = path.join(downloadsPath, targetFolder);
    const destination = getUniquePath(path.join(targetDir, file));

    if (!dryRun) {
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
      fs.renameSync(fullPath, destination);
    }

    console.log(
      dryRun
        ? `✔ [Dry-run] ${file} → ${targetFolder}/`
        : `✔ ${file} → ${targetFolder}/`
    );
  });

  return dryRun ? summary : null;
};
