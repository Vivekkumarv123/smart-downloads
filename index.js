import os from 'os';
import path from 'path';
import { organizeDownloads } from './organizer.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('dry-run', { type: 'boolean', default: false, description: 'Simulate file organization' })
  .option('days', { type: 'number', default: 0, description: 'Only organize files older than N days' })
  .option('config', { type: 'string', description: 'Custom JSON config for folder mapping' })
  .argv;

const downloadsPath = path.join(os.homedir(), 'Downloads', 'a');

console.log('📂 Smart Downloads Organizer\n');

try {
  organizeDownloads(downloadsPath, {
    dryRun: argv['dry-run'],
    minAgeDays: argv.days,
    configPath: argv.config
  });
  console.log('\n✅ Operation complete!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
