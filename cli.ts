#!/usr/bin/env ts-node

import cmd from '@commander-js/extra-typings'
import figlet from 'figlet'
import run from './index.ts'
import pkgjson from './package.json'

const p = cmd.program
  .version(pkgjson.version)
  .addHelpText(
    'beforeAll',
    figlet.textSync('OpenWrt\nPackage List\nBuilder').replace(/\s+?(\n\s+?)$/, ` v${pkgjson.version}$1`)
  )
  .description('Generate a space-delimitted package list from various sources and output it to a file that can be used with `opkg install`')
  .addHelpText('after', `
Examples:
  * Generate a merged package list from two space-delimitted package lists:
      $ oplb -l list1.txt list2.txt -o packages.txt

  * Migrate your router to a new major version of OpenWrt:
      $ oplb \\
          --json-list-paths 22_03_packagelist_backup.json \\
          --list-paths 23_05_defaults.txt 23_05_extras.txt \\
          --remove-list-paths unsupported_23_05.txt \\
          --outfile 23_05_packages.txt

  * Back up your installed packages to a json file with a custom name:
      ## (on your router)
      $ opkg list-installed | awk '{print $1}' > installed_packages.txt

      ## (with this tool)
      $ oplb -p installed_packages.txt -b installed_packages.json
      `)
  .option('-l, --list-paths <paths...>', 'specify files with space-delimitted package lists to pull packages from', [])
  .option('-r, --remove-list-paths <paths...>', 'specify files with space-delimitted package lists to remove packages from', [])
  .option('-p, --opkg-list-paths <paths...>', 'specify files with list outputs from `opkg` to pull package names from', [])
  .option('-j, --json-list-paths <paths...>', 'specify a json backup file to pull packages from', [])
  .option('-b, --backup [path]', 'create a JSON backup of the list to [path], or `backup_${LOCALE_DATE}_${EPOCH_MS}.json` if not specified', true)
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
      console.info(figlet.textSync('OpenWrt\nPackage List\nBuilder'));

      if (!backup && !output) {
        console.error('No output specified');
        p.help();
        return;
      }

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
