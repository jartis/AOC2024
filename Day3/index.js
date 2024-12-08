// Load input.txt into a giant string
import { readFileSync } from 'fs';

let input = readFileSync('input.txt', 'utf8');
// let input = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))';

// The do() instruction enables future mul instructions.
// The don't() instruction disables future mul instructions.

// So... if we split on "don't", it's OFF at the start of every entry except zero.
const dontSplits = input.split('don\'t');
// Then for each entry, remove everything up to the first "do"
const doSplits = [];
dontSplits.forEach((split, index) => {
  if (index === 0) {
    doSplits.push(split);
    return;
  }
  const doSplit = split.indexOf('do');
  if (doSplit === -1) return;
  doSplits.push(split.slice(doSplit + 2));
});

// And reunite all the "do splits" into input!
input = doSplits.join('');

console.log(input);

// Make a regex that matches mul([group of 1-3 digits],[group of 1-3 digits])
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = input.match(regex);

let sum = 0;

matches.forEach((match) => {
  const nums = match.match(/\d{1,3}/g);
  const product = parseInt(nums[0], 10) * parseInt(nums[1], 10);
  sum += product;
});

console.log(sum);