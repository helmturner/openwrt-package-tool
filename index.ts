import fs from "node:fs";
import { readFromLuciOpkgCopyPaste } from "./parseOpkgOutput.ts";
import { readFromPackagesInput } from "./parsePackageList.ts";

export default function (opts: {
  rawListPaths?: string[];
  opkgListPaths?: string[];
  jsonBackupPaths?: string[];
  outfile: string;
}) {
  const inputs: string[][] = [];

  if (opts.rawListPaths) {
    for (const path of opts.rawListPaths) {
      inputs.push(readFromPackagesInput(path));
    }
  }

  if (opts.opkgListPaths) {
    for (const path of opts.opkgListPaths) {
      inputs.push(readFromLuciOpkgCopyPaste(path));
    }
  }

  if (opts.jsonBackupPaths) {
    for (const path of opts.jsonBackupPaths) {
      const json = JSON.parse(fs.readFileSync(path, "utf-8"));
      if (!json.packages) {
        throw new Error('Invalid JSON backup file: missing "packages" key');
      }

      if (!Array.isArray(json.packages)) {
        throw new Error(
          'Invalid JSON backup file: "packages" key must be an array of strings'
        );
      }

      if (json.packages.some((pkg: unknown) => typeof pkg !== "string")) {
        throw new Error(
          'Invalid JSON backup file: "packages" key must be an array of strings'
        );
      }

      inputs.push(json.packages);
    }
  }

  const unique = new Set(inputs.flat().sort());
  const packages = Array.from(unique);

  fs.writeFileSync(opts.outfile, packages.join(" ").trim());

  const month = new Date().getMonth();
  const day = new Date().getDate();
  const year = new Date().getFullYear();

  fs.writeFileSync(
    `backup_${month}-${day}-${year % 100}_${Date.now()}.json`,
    JSON.stringify({ packages }, null, 2)
  );
}
