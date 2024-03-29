import fs from 'fs';

export function readFromPackagesInput(path) {
    let packagesInput = '';
  
    try {
      packagesInput = fs.readFileSync(path, 'utf8');
    } catch (err) {
      if (!err.message.includes('no such file or directory')) {
        console.error(err);
      }
    }
  
    return packagesInput.trim().split(' ').filter(Boolean);
  }
