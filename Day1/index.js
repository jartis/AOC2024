/*
3   4
4   3
2   5
1   3
3   9
3   3
*/

// So, each line is a pair of numbers separated by one-or-more spaces.
// Put the LEFT ones in a list, and the RIGHT ones in another.
// Sort each side, then get the TOTAL OF DIFFERENCES between the two.

import { readFileSync } from 'fs';

const Input = readFileSync('input.txt', 'utf8').split(/[\r\n]+/);

// Input should be an array of lines now.
const Left = [];
const Right = [];
Input.forEach((line) => {
  const Parts = line.split(' ').filter((e) => (e.length > 0));
  if (Parts.length !== 2) {
    console.log('Not just two parts!');
    throw(null);
  }
  Left.push(parseInt(Parts[0]));
  Right.push(parseInt(Parts[1]));
});

// Sort those two!
Left.sort();
Right.sort();

// Get the difference for each line
const Diffs = Left.map((entry, index) => { return Math.abs(Right[index] - Left[index]); });
let DiffSum = 0;
Diffs.forEach((diff) => {
  DiffSum += diff;
});

// Similarity score: (number on left) * (count of number on right)
let SimSum = 0;
Left.forEach((entry) => {
  const RightCount = Right.filter(r => r === entry).length;
  SimSum += (entry * RightCount);
});

console.log(DiffSum);
console.log(SimSum);
