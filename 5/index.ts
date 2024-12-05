import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);

const [rules, updates] = fileContents.split("\n\n");
const rulesTupleArray = rules.split("\n").map((rule) => rule.split("|"));
const correctlyOrderedUpdates: string[][] = [];
const inccorectlyOrderedUpdates: string[][] = [];
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

function orderPages(pages: string[]) {
  const n = pages.length;
  const inDegree = new Map<string, number>();
  const graph = new Map<string, Set<string>>();

  // Initialize graph and in-degree counts
  pages.forEach((page) => {
    if (!graph.has(page)) {
      graph.set(page, new Set());
    }
    inDegree.set(page, 0);
  });

  // Build graph and calculate in-degrees
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && rulesMap.get(pages[i])?.has(pages[j])) {
        graph.get(pages[i])!.add(pages[j]);
        inDegree.set(pages[j], inDegree.get(pages[j])! + 1);
      }
    }
  }

  // Topological sort using Kahn's algorithm
  const queue: string[] = [];
  const result: string[] = [];

  // Add all vertices with 0 in-degree to queue
  pages.forEach((page) => {
    if (inDegree.get(page) === 0) {
      queue.push(page);
    }
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    graph.get(current)!.forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return result;
}

updates.split("\n").forEach((update) => {
  const pages = update.split(",");
  if (isCorrectlyOrdered(pages)) {
    correctlyOrderedUpdates.push(pages);
  } else {
    inccorectlyOrderedUpdates.push(orderPages(pages));
  }
});

function sumOfMiddlePages(updates: string[][]) {
  let sum = 0;
  updates.forEach((update) => {
    const middleIndex = Math.floor(update.length / 2);
    sum += parseInt(update[middleIndex], 10);
  });
  return sum;
}

console.log(
  "Correctly ordered pages:",
  sumOfMiddlePages(correctlyOrderedUpdates)
);
console.log(
  "Incorrectly ordered pages:",
  sumOfMiddlePages(inccorectlyOrderedUpdates)
);
