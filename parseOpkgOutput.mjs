import fs from 'fs';

/**
 * Returns an array of package names given the output from `opkg list-installed`
 * @param {string} path
 */
export function readFromLuciOpkgCopyPaste(path) {
    let luciOpkgCopyPaste = '';
    const regexToStripFromLuciOpkgCopyPaste = /(?<=^[\S]*)[\s].*\n.*[\s]*/gm;
  
    try {
      luciOpkgCopyPaste = fs.readFileSync(path, 'utf8');
    } catch (err) {
      if (!err.message.includes('no such file or directory')) {
        console.error(err);
      }
    }
  
    return luciOpkgCopyPaste
      .replace(regexToStripFromLuciOpkgCopyPaste, ` `)
      .trim()
      .split(' ')
      .filter(Boolean);
  }
