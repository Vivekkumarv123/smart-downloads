import fs from 'fs';
import path from 'path';
import { fileTypes } from './fileTypes.js';
import { getUniquePath } from './utils.js';

export const organizeDownloads = (downloadsPath, options = {}) => {
  const { dryRun = false, minAgeDays = 0, configPath } = options;

  // Use custom mapping if provided
  const mapping = configPath
    ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    : fileTypes;

  const files = fs.readdirSync(downloadsPath);
  const now = Date.now();

  // Today’s 00:00 for intuitive age calculation
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  files.forEach(file => {
    const fullPath = path.join(downloadsPath, file);

    if (fs.lstatSync(fullPath).isDirectory()) return;

    const stats = fs.statSync(fullPath);

    // Intuitive file age in full days
    const fileDate = new Date(stats.mtimeMs);
    const ageInDays = Math.floor((todayStart - fileDate) / (1000 * 60 * 60 * 24));

    if (ageInDays < minAgeDays) return; // skip recent files

    const ext = path.extname(file).toLowerCase();
    let targetFolder = 'Others';

    for (const [folder, extensions] of Object.entries(mapping)) {
      if (extensions.includes(ext)) {
        targetFolder = folder;
        break;
      }
    }

    const targetDir = path.join(downloadsPath, targetFolder);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

    const destination = getUniquePath(path.join(targetDir, file));

    if (!dryRun) fs.renameSync(fullPath, destination);

    console.log(dryRun
      ? `✔ [Dry-run] ${file} → ${targetFolder}/`
      : `✔ ${file} → ${targetFolder}/`);
  });
};
