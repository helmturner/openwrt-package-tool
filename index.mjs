import fs from 'fs';
import { readFromLuciOpkgCopyPaste } from "./parseOpkgOutput.mjs";

const fromLuciOpkgCopyPaste = readFromLuciOpkgCopyPaste("luci-opkg.txt");
const fromPackagesInput = readFromPackagesInput("packages-input.txt");

const arr = [
  ...fromLuciOpkgCopyPaste,
  ...fromPackagesInput,
];

let unique = new Set(arr.sort());
let print = Array.from(unique);

fs.writeFileSync('./packages.txt', print.join(' ').trim());

const month = new Date().getMonth();
const day = new Date().getDate();
const year = new Date().getFullYear();

fs.writeFileSync(
  `backup_${month}-${day}-${year}_${Date.now()}.json`,
  JSON.stringify({ packages: print })
);
