#!/usr/bin/env ts-node

import cmd from '@commander-js/extra-typings'
import figlet from 'figlet'
import run from './index.ts'

const p = cmd.program
    .version('0.0.1')
    .description(figlet.textSync('Package List Generator'))
    .option('-r, --raw-list-paths <paths...>', 'specify files with space-delimitted package lists to pull packages from', [])
    .option('-p, --opkg-list-paths <paths...>', 'specify files with list outputs from `opkg` to pull package names from', [])
    .option('-j, --json-backup-paths <paths...>', 'specify a json backup file to pull packages from', [])
    .option('-o, --outfile <path>', 'specify the output file', '.packages')
    .action((options) => {
        console.info(figlet.textSync('Package List Generator'));
        run(options)
    })

p.parse(process.argv)
