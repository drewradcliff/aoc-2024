import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);
const lines = fileContents.split("\n");
const lines2d = lines.map((line) => line.split(""));

let sum = 0;

for (let i = 0; i < lines2d.length; i++) {
  const line = lines2d[i];
  for (let j = 0; j < line.length; j++) {
    // check horizontals
    if (
      line[j] === "X" &&
      line[j + 1] === "M" &&
      line[j + 2] === "A" &&
      line[j + 3] === "S"
    ) {
      sum++;
    }
    if (
      line[j] === "S" &&
      line[j + 1] === "A" &&
      line[j + 2] === "M" &&
      line[j + 3] === "X"
    ) {
      sum++;
    }
    // check verticals
    if (
      lines2d[i][j] === "X" &&
      lines2d[i + 1]?.[j] === "M" &&
      lines2d[i + 2]?.[j] === "A" &&
      lines2d[i + 3]?.[j] === "S"
    ) {
      sum++;
    }
    if (
      lines2d[i][j] === "S" &&
      lines2d[i + 1]?.[j] === "A" &&
      lines2d[i + 2]?.[j] === "M" &&
      lines2d[i + 3]?.[j] === "X"
    ) {
      sum++;
    }
    // check diagonals sloping down
    if (
      lines2d[i][j] === "X" &&
      lines2d[i + 1]?.[j + 1] === "M" &&
      lines2d[i + 2]?.[j + 2] === "A" &&
      lines2d[i + 3]?.[j + 3] === "S"
    ) {
      sum++;
    }
    if (
      lines2d[i][j] === "S" &&
      lines2d[i + 1]?.[j + 1] === "A" &&
      lines2d[i + 2]?.[j + 2] === "M" &&
      lines2d[i + 3]?.[j + 3] === "X"
    ) {
      sum++;
    }
    // check diagonals sloping up
    if (
      lines2d[i][j] === "X" &&
      lines2d[i - 1]?.[j + 1] === "M" &&
      lines2d[i - 2]?.[j + 2] === "A" &&
      lines2d[i - 3]?.[j + 3] === "S"
    ) {
      sum++;
    }
    if (
      lines2d[i][j] === "S" &&
      lines2d[i - 1]?.[j + 1] === "A" &&
      lines2d[i - 2]?.[j + 2] === "M" &&
      lines2d[i - 3]?.[j + 3] === "X"
    ) {
      sum++;
    }
  }
}

console.log("Number of XMAS in word search:", sum);
