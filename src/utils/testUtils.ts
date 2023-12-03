import * as fs from "fs";
import Day from "./day";
import { expect, test, it } from "vitest";

const run = (
  func: (input: string) => any,
  inputFile: string,
  part: string,
  expected?: any
) => {
  const input = fs.readFileSync(inputFile, {
    encoding: "utf8",
  });
  const output = func(input);
  if (expected != null) expect(output).toBe(expected);
  else console.log(`${part} - ${output}`);
}

const tests = (day: Day, testDirname: string) => {
  test.each(day.expectedPart1Results())(
    "Part1 - %s - %s",
    async (inputFile, expected) => {
      run(day.part1, `${testDirname}/data/${inputFile}`, "Part1", expected);
    }
  );

  day.runPart1 && it("Part1 Final", async () => {
    run(day.part1, `${testDirname}/data/${day.inputPart1}`, "Part1");
  });

  test.each(day.expectedPart2Results())(
    "Part2 - %s - %s",
    async (inputFile, expected) => {
      run(day.part2, `${testDirname}/data/${inputFile}`, "Part2", expected);
    }
  );

  day.runPart2 && it("Part2 Final", async () => {
    run(day.part2, `${testDirname}/data/${day.inputPart2}`, "Part2");
  });
};

export default tests