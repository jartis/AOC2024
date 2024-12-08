import { readFileSync } from 'fs';

let inputFile = readFileSync('input.txt', 'utf8');
inputFile = inputFile.replace(/\r/g, '');

// Split the input at two newlines
let [rules, updates] = inputFile.split('\n\n');
console.log(updates);

// Rules split by lines, then at the pipe
rules = rules.split('\n');
rules = rules.map((rule) => {
  return rule.split('|');
});
console.log(rules);

// Updates split by lines
updates = updates.split('\n');

function ValidateUpdate(update) {
  // update is a string with a comma separated list of pages
  // Anywho, check it against the rules.

  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    if (update.indexOf(rule[0]) < 0 || update.indexOf(rule[1]) < 0) {
      continue;
    }
    if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
      console.log(`Invalid: ${update} - ${rule[0]} before ${rule[1]}`);
      return false;
    }
  }
  return true;
}

function FixUpdate(update) {
  // update is a string with a comma separated list of pages
  // Make sure that it obeys all the rules
  let fixed = update;
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    if (fixed.indexOf(rule[0]) < 0 || fixed.indexOf(rule[1]) < 0) {
      continue;
    }
    if (fixed.indexOf(rule[0]) > fixed.indexOf(rule[1])) {
      const pagesList = fixed.split(',');
      const insertPoint = pagesList.indexOf(rule[0]);
      pagesList.splice(insertPoint, 0, pagesList.splice(pagesList.indexOf(rule[1]), 1));

      console.log(`Fixing: ${fixed} - ${rule[0]} before ${rule[1]}`);
      fixed = fixed.replace(rule[0], 'X');
      fixed = fixed.replace(rule[1], 'Y');
      fixed = fixed.replace('X', rule[1]);
      fixed = fixed.replace('Y', rule[0]);
    }
  }
  return fixed;
}

let sumOfMiddles = 0;
updates.forEach((update) => {
  if (ValidateUpdate(update)) {
    console.log('Valid, skipping');
  } else {
    console.log('Invalid, fixing');

    while(!ValidateUpdate(update)) {
      update = FixUpdate(update);
    }

    // Get the "middle number"
    let middle = update.split(',');
    while (middle.length > 1) {
      middle.shift();
      middle.pop();
    }
    console.log(`Middle: ${middle}`);
    sumOfMiddles += parseInt(middle[0], 10);
  }
});

console.log(sumOfMiddles);