import { GetFileAsLines } from "./util.js";

const SrcData = GetFileAsLines('input.txt');
const SafeReports = [];

for (let lineIdx = 0; lineIdx < SrcData.length; lineIdx += 1) {
  // 7 6 4 2 1
  const line = SrcData[lineIdx];

  // Each line is an array of space-separated ints.
  const values = line.split(' ');
  values.forEach((val) => {
    val = parseInt(val, 10);
  });
  const signs = [];
  const diffs = [];
  for (let valIdx = 0; valIdx < values.length - 1; valIdx += 1) {
    const actualDiff = values[valIdx] - values[valIdx + 1];
    const sign = Math.sign(actualDiff);
    if (valIdx > 0 && sign != signs[0]) continue; // Changing signs!
    signs.unshift(sign);
    const posDif = Math.abs(actualDiff);
    if (posDif < 1 || posDif > 3) continue; // First diff out of range?
    diffs.unshift(posDif);
  }
  // We made it through the checks - this one is safe!
  if (diffs.length === values.length - 1) {
    SafeReports.push(lineIdx);
  }
}

console.log(SafeReports.length);
