import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);

const [rules, updates] = fileContents.split("\n\n");
const rulesTupleArray = rules.split("\n").map((rule) => rule.split("|"));
const correctlyOrderedUpdates: string[][] = [];
const rulesMap = new Map<string, Set<string>>();

rulesTupleArray.forEach(([before, after]) => {
  if (!rulesMap.has(before)) {
    rulesMap.set(before, new Set());
  }
  rulesMap.get(before)!.add(after);
});

function isCorrectlyOrdered(update: string[]) {
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const before = update[i];
      const after = update[j];
      if (!rulesMap.get(before)?.has(after)) {
        return false;
      }
    }
  }
  return true;
}

updates.split("\n").forEach((update) => {
  const pages = update.split(",");
  if (isCorrectlyOrdered(pages)) {
    correctlyOrderedUpdates.push(pages);
  }
});

let sumOfMiddlePages = 0;
correctlyOrderedUpdates.forEach((update) => {
  const middleIndex = Math.floor(update.length / 2);
  sumOfMiddlePages += parseInt(update[middleIndex], 10);
});

console.log(sumOfMiddlePages);
