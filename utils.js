import fs from 'fs';
import path from 'path';

export const getUniquePath = (destPath) => {
  if (!fs.existsSync(destPath)) return destPath;

  const dir = path.dirname(destPath);
  const ext = path.extname(destPath);
  const base = path.basename(destPath, ext);

  let counter = 1;
  let newPath;

  do {
    newPath = path.join(dir, `${base}(${counter})${ext}`);
    counter++;
  } while (fs.existsSync(newPath));

  return newPath;
};
