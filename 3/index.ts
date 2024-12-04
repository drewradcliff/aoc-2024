import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);

const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gm;
const matches = fileContents.matchAll(regex);
let enabled = true;

const sum = matches.reduce((acc, curr) => {
  const [match, a, b] = curr;
  if (match === "do()") {
    enabled = true;
    return acc;
  } else if (match === "don't()") {
    enabled = false;
    return acc;
  }

  return enabled ? acc + Number(a) * Number(b) : acc;
}, 0);

console.log(sum);
