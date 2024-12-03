import { dirname, join, fromFileUrl } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);
const lines = fileContents.split("\n");
const columns = lines.map((line) => line.split(/\s+/));
const firstColumn: number[] = [];
const secondColumn: number[] = [];

for (const [num1, num2] of columns) {
  firstColumn.push(parseInt(num1));
  secondColumn.push(parseInt(num2));
}

firstColumn.sort((a, b) => a - b);
secondColumn.sort((a, b) => a - b);

const distance = firstColumn.reduce((acc, curr, index) => {
  return acc + Math.abs(curr - secondColumn[index]);
}, 0);

const score = firstColumn.reduce((acc, curr) => {
  return acc + curr * secondColumn.filter((num) => num === curr).length;
}, 0);

console.log("Distance:", distance);
console.log("Score:", score);
