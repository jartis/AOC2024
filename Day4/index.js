import { GetFileAsLines } from "../util.js";

const wordSearchLines = GetFileAsLines('input.txt');

const wordSearch = wordSearchLines.map((line) => {
  return line.split('');
});

let count = 0;
// // Find all the horizontal occurrences
// for (let row = 0; row < wordSearch.length; row += 1) {
//   for (let col = 0; col < wordSearch[row].length - 3; col += 1) {
//     if (wordSearch[row][col] === 'X' 
//       && wordSearch[row][col + 1] === 'M' 
//       && wordSearch[row][col + 2] === 'A' 
//       && wordSearch[row][col + 3] === 'S') {
//       console.log(`Found "xmas" at row ${row}, column ${col}`);
//       count += 1;
//     }
//     if (wordSearch[row][col] === 'S' 
//       && wordSearch[row][col + 1] === 'A' 
//       && wordSearch[row][col + 2] === 'M' 
//       && wordSearch[row][col + 3] === 'X') {
//       console.log(`Found "xmas" (reversed) at row ${row}, column ${col}`);
//       count += 1;
//     }
//   }
// }

// // Find all the vertical occurrences
// for (let col = 0; col < wordSearch[0].length; col += 1) {
//   for (let row = 0; row < wordSearch.length - 3; row += 1) {
//     if (wordSearch[row][col] === 'X' 
//       && wordSearch[row + 1][col] === 'M' 
//       && wordSearch[row + 2][col] === 'A' 
//       && wordSearch[row + 3][col] === 'S') {
//       console.log(`Found "xmas" at row ${row}, column ${col}`);
//       count += 1;
//     }
//     if (wordSearch[row][col] === 'S' 
//       && wordSearch[row + 1][col] === 'A' 
//       && wordSearch[row + 2][col] === 'M' 
//       && wordSearch[row + 3][col] === 'X') {
//       console.log(`Found "xmas" (reversed) at row ${row}, column ${col}`);
//       count += 1;
//     }
//   }
// }

// // Find down-right diagonals
// for (let row = 0; row < wordSearch.length - 3; row += 1) {
//   for (let col = 0; col < wordSearch[row].length - 3; col += 1) {
//     if (wordSearch[row][col] === 'X' 
//       && wordSearch[row + 1][col + 1] === 'M' 
//       && wordSearch[row + 2][col + 2] === 'A' 
//       && wordSearch[row + 3][col + 3] === 'S') {
//       console.log(`Found "xmas" at row ${row}, column ${col}`);
//       count += 1;
//     }
//     if (wordSearch[row][col] === 'S' 
//       && wordSearch[row + 1][col + 1] === 'A' 
//       && wordSearch[row + 2][col + 2] === 'M' 
//       && wordSearch[row + 3][col + 3] === 'X') {
//       console.log(`Found "xmas" (reversed) at row ${row}, column ${col}`);
//       count += 1;
//     }
//   }
// }

// // Find down-left diagonals
// for (let row = 0; row < wordSearch.length - 3; row += 1) {
//   for (let col = 3; col < wordSearch[row].length; col += 1) {
//     if (wordSearch[row][col] === 'X' 
//       && wordSearch[row + 1][col - 1] === 'M' 
//       && wordSearch[row + 2][col - 2] === 'A' 
//       && wordSearch[row + 3][col - 3] === 'S') {
//       console.log(`Found "xmas" at row ${row}, column ${col}`);
//       count += 1;
//     }
//     if (wordSearch[row][col] === 'S' 
//       && wordSearch[row + 1][col - 1] === 'A' 
//       && wordSearch[row + 2][col - 2] === 'M' 
//       && wordSearch[row + 3][col - 3] === 'X') {
//       console.log(`Found "xmas" (reversed) at row ${row}, column ${col}`);
//       count += 1;
//     }
//   }
// }

// We're now looking for two "M" "A" "S" that cross each other
for (let y = 1; y < wordSearch.length - 1; y += 1) {
  for (let x = 1; x < wordSearch[y].length - 1; x += 1) {
    // We'll check at every A
    if (wordSearch[y][x] !== 'A') continue;

    if (wordSearch[y - 1][x - 1] === 'M'
      && wordSearch[y - 1][x + 1] === 'M'
      && wordSearch[y + 1][x - 1] === 'S'
      && wordSearch[y + 1][x + 1] === 'S') {
      console.log(`Found "xmas" at row ${y}, column ${x}`);
      count += 1;
    }
    if (wordSearch[y - 1][x - 1] === 'S'
      && wordSearch[y - 1][x + 1] === 'S'
      && wordSearch[y + 1][x - 1] === 'M'
      && wordSearch[y + 1][x + 1] === 'M') {
      console.log(`Found "xmas" (reversed) at row ${y}, column ${x}`);
      count += 1;
    }
    if (wordSearch[y - 1][x - 1] === 'M'
      && wordSearch[y - 1][x + 1] === 'S'
      && wordSearch[y + 1][x - 1] === 'M'
      && wordSearch[y + 1][x + 1] === 'S') {
      console.log(`Found "xmas" at row ${y}, column ${x}`);
      count += 1;
    }
    if (wordSearch[y - 1][x - 1] === 'S'
      && wordSearch[y - 1][x + 1] === 'M'
      && wordSearch[y + 1][x - 1] === 'S'
      && wordSearch[y + 1][x + 1] === 'M') {
      console.log(`Found "xmas" (reversed) at row ${y}, column ${x}`);
      count += 1;
    }
  }
}

console.log(`Found ${count} occurrences of "xmas" in the word search!`);