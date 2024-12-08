import { readFileSync } from "fs";

let inputFile = readFileSync("input.txt", "utf8").replace(/\r/g, "");

const srcMaze = inputFile.split('\n').map((line) => {
  return line.split('');
});

const GuardLocations = ['v', '<', '^', '>'];
const PathsTaken = ['↓', '←', '↑', '→'];

function GetCurrentPosition(maze) {
  for (let y = 0; y < maze.length; y += 1) {
    for (let x = 0; x < maze[y].length; x += 1) {
      if (GuardLocations.includes(maze[y][x])) {
        return { y, x };
      }
    }
  }
}

function TakeStep(maze) {
  const CurrentPosition = GetCurrentPosition(maze);
  let NewPosition = { ...CurrentPosition };
  switch (maze[CurrentPosition.y][CurrentPosition.x]) {
    case 'v':
      NewPosition.y += 1;
      break;
    case '<':
      NewPosition.x -= 1;
      break;
    case '^':
      NewPosition.y -= 1;
      break;
    case '>':
      NewPosition.x += 1;
      break;
  }
  if (NewPosition.x < 0 || NewPosition.x >= maze[0].length || NewPosition.y < 0 || NewPosition.y >= maze.length) {
    return 'Done';
  }
  // We didn't leave the maze, check if the next cell is walkable
  if (maze[NewPosition.y][NewPosition.x] === '.' || PathsTaken.includes(maze[NewPosition.y][NewPosition.x])) {
    // Check if we're retracing our steps!
    if (PathsTaken.includes(maze[NewPosition.y][NewPosition.x])) {
      const newPositionDirection = PathsTaken.indexOf(maze[NewPosition.y][NewPosition.x]);
      const currentPositionDirection = GuardLocations.indexOf(maze[CurrentPosition.y][CurrentPosition.x]);
      if (newPositionDirection === currentPositionDirection) {
        // We've been here before, going this way.
        return 'Loop';
      }
    }

    // It is? Mark that we've been there and move the guard
    maze[NewPosition.y][NewPosition.x] = maze[CurrentPosition.y][CurrentPosition.x];
    switch (maze[CurrentPosition.y][CurrentPosition.x]) {
      case 'v':
        maze[CurrentPosition.y][CurrentPosition.x] = PathsTaken[0];
        break;
      case '<':
        maze[CurrentPosition.y][CurrentPosition.x] = PathsTaken[1];
        break;
      case '^':
        maze[CurrentPosition.y][CurrentPosition.x] = PathsTaken[2];
        break;
      case '>':
        maze[CurrentPosition.y][CurrentPosition.x] = PathsTaken[3];
        break;
    }
    return 'Moving';
  }
  if (maze[NewPosition.y][NewPosition.x] === '#') {
    // Nope, we hit a wall. Turn right!
    switch (maze[CurrentPosition.y][CurrentPosition.x]) {
      case 'v':
        maze[CurrentPosition.y][CurrentPosition.x] = '<';
        if (CurrentPosition.x > 0 && maze[CurrentPosition.y][CurrentPosition.x - 1] === PathsTaken[1]) {
          return 'Loop';
        }
        break;
      case '<':
        maze[CurrentPosition.y][CurrentPosition.x] = '^';
        if (CurrentPosition.y > 0 && maze[CurrentPosition.y - 1][CurrentPosition.x] === PathsTaken[2]) {
          return 'Loop';
        }
        break;
      case '^':
        maze[CurrentPosition.y][CurrentPosition.x] = '>';
        if (CurrentPosition.x < maze[0].length - 1 && maze[CurrentPosition.y][CurrentPosition.x + 1] === PathsTaken[3]) {
          return 'Loop';
        }
        break;
      case '>':
        maze[CurrentPosition.y][CurrentPosition.x] = 'v';
        if (CurrentPosition.y < maze.length - 1 && maze[CurrentPosition.y + 1][CurrentPosition.x] === PathsTaken[0]) {
          return 'Loop';
        }
        break;
    }
    return 'Turning';
  }
  // Something else happened?!
  return 'Error';
}

// Brute force all the positions in the maze. Everywhere walkable, attempt putting
// an obstacle there, and see if we ever hit a loop.

// We can trim this down to only the spots we walked on
const firstPassMaze = srcMaze.map((line) => {
  return line.slice();
});
while (TakeStep(firstPassMaze) !== 'Done') { }
const obsLocations = [];
for (let y = 0; y < firstPassMaze.length; y += 1) {
  for (let x = 0; x < firstPassMaze[y].length; x += 1) {
    if (PathsTaken.includes(firstPassMaze[y][x])) {
      obsLocations.push({ y, x });
    }
  }
}

let obstacleSpots = 0;
for (let y = 10; y < srcMaze.length; y += 1) {
  for (let x = 68; x < srcMaze[y].length; x += 1) {
    if (obsLocations.some((loc) => loc.y === y && loc.x === x)) {
      console.log(`Checking ${x},${y} of ${srcMaze[0].length},${srcMaze.length}`);
      if (srcMaze[y][x] === '.') {
        // We can walk here, try blocking it
        const mazeCopy = srcMaze.map((line) => {
          return line.slice();
        });
        mazeCopy[y][x] = '#';

        let loop = false;
        let lastStep = '';
        while (lastStep !== 'Loop') {
          lastStep = TakeStep(mazeCopy);
          if (lastStep === 'Done') {
            break;
          }
        }
        if (lastStep === 'Loop') {
          console.log(`Loop detected at ${x},${y}`);
          obstacleSpots += 1;
        }
      }
    }
  }
}

console.log(`Obstacle spots: ${obstacleSpots}`);

// // Now that we're out, see how many squares we walked on
// let count = 0;
// for (let y = 0; y < maze.length; y += 1) {
//   for (let x = 0; x < maze[y].length; x += 1) {
//     if (PathsTaken.includes(maze[y][x]) || GuardLocations.includes(maze[y][x])) {
//       count += 1;
//     }
//   }
// }

// function CheckForLoops() {

// }

// Output the whole map
// maze.forEach((line) => {
//   console.log(line.join(''));
// });

// console.log(count);