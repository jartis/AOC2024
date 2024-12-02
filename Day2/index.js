import { GetFileAsLines } from "./util.js";

const SrcData = GetFileAsLines('input.txt');
const SafeReports = [];

for (let lineIdx = 0; lineIdx < SrcData.length; lineIdx += 1) {
  // 7 6 4 2 1
  const line = SrcData[lineIdx];

  // Make an array of the original, and with each individual element removed
  const LineArray = [];

  // Each line is an array of space-separated ints.
  const values = line.split(' ');
  values.forEach((val) => {
    val = parseInt(val, 10);
  });

  // Now that it's all values, build our arrays!
  for (let i = 0; i < values.length; i++) {
    const splicedArr = values.slice();
    splicedArr.splice(i, 1);
    LineArray.push(splicedArr);
  }
  // And put the original back in
  LineArray.push(values);

  LineArray.forEach((valSet) => {
    const signs = [];
    const diffs = [];
    for (let valIdx = 0; valIdx < valSet.length - 1; valIdx += 1) {
      const actualDiff = valSet[valIdx] - valSet[valIdx + 1];
      const sign = Math.sign(actualDiff);
      if (valIdx > 0 && sign != signs[0]) continue; // Changing signs!
      signs.unshift(sign);
      const posDif = Math.abs(actualDiff);
      if (posDif < 1 || posDif > 3) continue; // First diff out of range?
      diffs.unshift(posDif);
    }
    // We made it through the checks - this one is safe!
    if (diffs.length === valSet.length - 1) {
      SafeReports.push(lineIdx);
    }
  });
}

// SafeReports should have entries for each safe COMBINATION, let's sort for uniqueness
const SafeSetSize = new Set(SafeReports).size;

console.log(SafeSetSize);
