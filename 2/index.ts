import { dirname, fromFileUrl, join } from "@std/path";

const inputPath = join(dirname(fromFileUrl(import.meta.url)), "input.txt");
const data = Deno.readFileSync(inputPath);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(data);
const reports = fileContents.split("\n");

const safeReports = reports.filter((report) => {
  const numbers = report.split(" ").map(Number);
  let increasing: boolean | null = null;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    const absDiff = Math.abs(diff);

    if (absDiff < 1 || absDiff > 3) {
      return false;
    }

    if (increasing === null) {
      increasing = diff > 0;
    } else if (diff > 0 !== increasing) {
      return false;
    }
  }

  return true;
});

console.log("Safe reports:", safeReports.length);
