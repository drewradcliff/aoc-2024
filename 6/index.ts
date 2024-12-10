import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);

const labMap = fileContents.split("\n").map((line) => line.split(""));
let y = labMap.findIndex((line) => line.includes("^"));
let x = labMap[y].indexOf("^");
let isGuardPatrolling = true;
let guardDirection = labMap[y][x];

while (isGuardPatrolling) {
  if (guardDirection === "^") {
    const next = labMap[y - 1][x];
    if (next === "#") {
      guardDirection = ">";
    } else if (next === undefined) {
      isGuardPatrolling = false;
      labMap[y][x] = "X";
    } else {
      labMap[y][x] = "X";
      y--;
    }
  } else if (guardDirection === ">") {
    const next = labMap[y][x + 1];
    if (next === "#") {
      guardDirection = "v";
    } else if (next === undefined) {
      isGuardPatrolling = false;
      labMap[y][x] = "X";
    } else {
      labMap[y][x] = "X";
      x++;
    }
  } else if (guardDirection === "v") {
    const next = labMap[y + 1][x];
    if (next === "#") {
      guardDirection = "<";
    } else if (next === undefined) {
      isGuardPatrolling = false;
      labMap[y][x] = "X";
    } else {
      labMap[y][x] = "X";
      y++;
    }
  } else if (guardDirection === "<") {
    const next = labMap[y][x - 1];
    if (next === "#") {
      guardDirection = "^";
    } else if (next === undefined) {
      isGuardPatrolling = false;
      labMap[y][x] = "X";
    } else {
      labMap[y][x] = "X";
      x--;
    }
  }
}

console.log(labMap.map((line) => line.join("")).join("\n"));
console.log(
  "Number of distinct positions:",
  labMap.reduce(
    (acc, line) => acc + line.filter((char) => char === "X").length,
    0
  )
);
