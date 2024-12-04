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
    // M . S
    // . A .
    // M . S
    if (
      lines2d[i][j] === "M" &&
      lines2d[i + 1]?.[j + 1] === "A" &&
      lines2d[i + 2]?.[j + 2] === "S" &&
      lines2d[i + 2]?.[j] === "M" &&
      lines2d[i]?.[j + 2] === "S"
    ) {
      sum++;
    }
    // S . S
    // . A .
    // M . M
    if (
      lines2d[i][j] === "S" &&
      lines2d[i + 1]?.[j + 1] === "A" &&
      lines2d[i + 2]?.[j + 2] === "M" &&
      lines2d[i + 2]?.[j] === "M" &&
      lines2d[i]?.[j + 2] === "S"
    ) {
      sum++;
    }
    // S . M
    // . A .
    // S . M
    if (
      lines2d[i][j] === "S" &&
      lines2d[i + 1]?.[j + 1] === "A" &&
      lines2d[i + 2]?.[j + 2] === "M" &&
      lines2d[i + 2]?.[j] === "S" &&
      lines2d[i]?.[j + 2] === "M"
    ) {
      sum++;
    }
    // M . M
    // . A .
    // S . S
    if (
      lines2d[i][j] === "M" &&
      lines2d[i + 1]?.[j + 1] === "A" &&
      lines2d[i + 2]?.[j + 2] === "S" &&
      lines2d[i + 2]?.[j] === "S" &&
      lines2d[i]?.[j + 2] === "M"
    ) {
      sum++;
    }
  }
}

console.log("Number of X-MAS in word search:", sum);
