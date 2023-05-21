const { input } = require("./input.js");

const test = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

const lines = input.trim().split("\n");
let counter = 0;
let countOverlap = 0;
let response = false;
let responseTwo = false;

lines.forEach((line) => {
  const [partOne, partTwo] = line.trim().split(",");

  let rangeOne = changeToRange(partOne);
  let rangeTwo = changeToRange(partTwo);

  if (rangeOne.length >= rangeTwo.length) {
    response = checkContain(rangeOne, rangeTwo);
    responseTwo = checkOverlap(rangeOne, rangeTwo);
  } else {
    response = checkContain(rangeTwo, rangeOne);
    responseTwo = checkOverlap(rangeTwo, rangeOne);
  }

  if (response) {
    counter++;
  }
  if (responseTwo) {
    countOverlap++;
  }
});

function changeToRange(part) {
  const [start, end] = part.trim().split("-");
  let zones = [];

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    zones.push(i);
  }
  return zones;
}

function checkContain(mainRange, subRange) {
  response = false;
  return subRange.every((element) => mainRange.includes(element));
}

function checkOverlap(mainRange, subRange) {
  responseTwo = false;
  return subRange.some((element) => mainRange.includes(element));
}

console.log("The counter is: " + counter);
console.log("The countOverlap is: " + countOverlap);
