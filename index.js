import os from 'os';
import path from 'path';
import { organizeDownloads } from './organizer.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('dry-run', { type: 'boolean', default: false, description: 'Simulate file organization' })
  .option('days', { type: 'number', default: 0, description: 'Only organize files older than N days' })
  .option('config', {type: 'string',describe: 'Use config.json or provide custom config path',default: true
  })
  .argv;

const downloadsPath = path.join(os.homedir(), 'Downloads', 'a');

console.log('📂 Smart Downloads Organizer\n');

try {
  const result = organizeDownloads(downloadsPath, {
    dryRun: argv['dry-run'],
    minAgeDays: argv.days,
    configPath: argv.config
  });

  if (argv['dry-run'] && result) {
    console.log('\n📊 Dry Run Summary');
    console.log('------------------');

    Object.entries(result.folders).forEach(([folder, count]) => {
      console.log(`${folder.padEnd(12)} → ${count} file(s)`);
    });

    console.log(`\nTotal files scanned: ${result.totalFiles}`);
    console.log('\n✅ No files were moved (dry run).');
  } else {
    console.log('\n✅ Operation complete!');
  }

} catch (err) {
  console.error('❌ Error:', err.message);
}
