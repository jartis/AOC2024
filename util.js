import { readFileSync } from 'fs';

export const GetFileAsLines = (filename) => {
  return readFileSync(filename, 'utf8').split(/[\r\n]+/);
};