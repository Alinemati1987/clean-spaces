// const { input } = require("./input.js");
const fs = require("fs");

// Main //

function main() {
  const allData = getData();
  partOne(allData, false);
  partTwo(allData, false);
}

// Functions //

function partOne(lines, resp) {
  let counter = 0;
  let response = resp;

  lines.forEach((line) => {
    const [secOne, secTwo] = line.trim().split(",");
    const [rangeOne, rangeTwo] = changeToRange([secOne, secTwo]);
    response = checkContain(rangeOne, rangeTwo);

    if (response) {
      counter++;
    }
  });
  print("Part ONE", counter);
}

function partTwo(lines, resp) {
  let countOverlap = 0;
  let responseTwo = resp;

  lines.forEach((line) => {
    const [secOne, secTwo] = line.trim().split(",");
    const [rangeOne, rangeTwo] = changeToRange([secOne, secTwo]);
    responseTwo = checkOverlap(rangeOne, rangeTwo);

    if (responseTwo) {
      countOverlap++;
    }
  });
  print("Part TWO", countOverlap);
}

function getData() {
  const input = fs.readFileSync("./input.txt").toString();
  const lines = input.trim().split("\n");
  return lines;
}

function changeToRange(sections) {
  let outputs = [];

  sections.forEach((section) => {
    const [start, end] = section.trim().split("-");
    let zones = [];

    for (let i = parseInt(start); i <= parseInt(end); i++) {
      zones.push(i);
    }
    outputs.push(zones);
  });

  return outputs;
}

function findOrder(rangeOne, rangeTwo) {
  if (rangeOne.length >= rangeTwo.length) {
    return [rangeOne, rangeTwo];
  } else {
    return [rangeTwo, rangeOne];
  }
}

function checkContain(rangeOne, rangeTwo) {
  const [mainRange, subRange] = findOrder(rangeOne, rangeTwo);
  return subRange.every((element) => mainRange.includes(element));
}

function checkOverlap(mainRange, subRange) {
  return subRange.some((element) => mainRange.includes(element));
}

function print(part, result) {
  console.log("The result for " + part + " is: " + result);
}

// Run the script //
main();
