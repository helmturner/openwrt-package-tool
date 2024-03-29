import fs from 'fs';

export function readFromPackagesInput(path: string) {
    let packagesInput = '';
  
    try {
      packagesInput = fs.readFileSync(path, 'utf8');
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error reading file: ${err.message}`);
      } else {
        throw new Error(`Error reading file: ${err}`);
      }
    }
  
    return packagesInput.trim().split(' ').filter(Boolean);
  }
