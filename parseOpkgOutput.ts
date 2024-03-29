import fs from "fs";

/**
 * Returns an array of package names given the output from `opkg list-installed`
 * @param {string} path
 */
export function readFromLuciOpkgCopyPaste(path: string) {
  let luciOpkgCopyPaste = "";
  const regexToStripFromLuciOpkgCopyPaste = /(?<=^[\S]*)[\s].*\n.*[\s]*/gm;

  try {
    luciOpkgCopyPaste = fs.readFileSync(path, "utf8");
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`Error reading file: ${err.message}`);
    } else {
      throw new Error(`Error reading file: ${err}`);
    }
  }

  return luciOpkgCopyPaste
    .replace(regexToStripFromLuciOpkgCopyPaste, ` `)
    .trim()
    .split(" ")
    .filter(Boolean);
}
