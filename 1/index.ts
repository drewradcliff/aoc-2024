import { readFileSync } from "fs";
import { join } from "path";

const inputPath = join(__dirname, "input.txt");
const fileContents = readFileSync(inputPath, "utf-8");

const [firstColumn, secondColumn] = fileContents
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/))
  .reduce(
    (acc, [num1, num2]) => {
      acc[0].push(parseInt(num1));
      acc[1].push(parseInt(num2));
      return acc;
    },
    [[], []] as number[][]
  );

firstColumn.sort((a, b) => a - b);
secondColumn.sort((a, b) => a - b);

const distance = firstColumn.reduce((acc, curr, index) => {
  return acc + Math.abs(curr - secondColumn[index]);
}, 0);

const score = firstColumn.reduce((acc, curr) => {
  return acc + curr * secondColumn.filter((num) => num === curr).length;
}, 0);

console.log("Total distance: ", distance);
console.log("Total similarity score: ", score);
