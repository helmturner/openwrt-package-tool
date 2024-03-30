#!/usr/bin/env ts-node

import cmd from '@commander-js/extra-typings'
import figlet from 'figlet'
import run from './index.ts'

const p = cmd.program
    .version('0.0.1')
    .description(figlet.textSync('Package List Generator'))
    .option('-l, --list-paths <paths...>', 'specify files with space-delimitted package lists to pull packages from', [])
    .option('-r, --remove-list-paths <paths...>', 'specify files with space-delimitted package lists to remove packages from', [])
    .option('-p, --opkg-list-paths <paths...>', 'specify files with list outputs from `opkg` to pull package names from', [])
  .option('-j, --json-list-paths <paths...>', 'specify a json backup file to pull packages from', [])
  .option('-b, --backup [path]', 'create a JSON backup of the list to [path], or `backup_<locale_date>_<epoch_ms>.json` if not specified', true)
  .option('-o, --output [path]', 'output a space-delimitted package list to [path], or `.packages` if not specified', true)
  .action(
    ({
      backup,
      jsonListPaths,
      listPaths,
      opkgListPaths,
      output,
      removeListPaths,
    }) => {
      console.info(figlet.textSync('Package List Generator'));

      if ([listPaths, opkgListPaths, jsonListPaths].every((x) => !x.length)) {
        console.error('No inputs specified');
        p.help();
        return;
      }

      if (backup === true) {
        backup = `backup_${new Date()
          .toLocaleDateString()
          .replace(/\//g, '-')}_${Date.now()}.json`;
      }

      if (output === true) {
        output = '.packages';
      }

      run({
        listPaths,
        opkgListPaths,
        jsonListPaths,
        removeListPaths,
        backup,
        output,
      });
    }
  );

p.parse(process.argv);
