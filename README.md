# AOC Typescript 2023

2023 Advent of Code using Typescript!  Eventual plans to add visualizations as well.

# Running a day

To run a particular day, simply run npm run test on the file for that day.

```
npm run test day01
```

## Data

Since it is frowned upon to add the inputs to github. All files ending in input.txt will be git ignored. It is expected that data, both sample and input files, is all in the relative path to the script executing for that day.  Like so:

```
.
├── src/days
│   ├── day01
│   │   ├── main.js
│   │   ├── data
│   │   │   ├── input.txt
│   │   │   ├── sample.txt
│   │   │   └── sample2.txt
```

## On testing with sample inputs

Each Day class has lists of expected results you may set for part1 and part2. It will simply run the file specified by the first item in the list and compare the output to the second item in the list. This is a nested array, so you can declare multiple tests per part.

Example: 
```
    expectedPart1Results = () => [
        ["sample.txt", 123], 
        ["sample2.txt", 456]
    ]
    expectedPart2Results = () => [
        ["sample.txt", 789]
    ]
```
will:
- verify 123 is the output of `part1` with file `sample.txt`
- verify 456 is the output of `part1` with file `sample1.txt`
- run `part1` with file `input.txt` and output the value to console
- verify 789 is the output of `part2` with file `sample.txt`
- run `part2` with file `input.txt` and output the value to console

This allows for flexibility if wanting to test multiple scenarios before the actual input runs.

## On alternate part2 inputs

Occasionally the part1 and part2 inputs will be different for a particular day.  If this happens, just set the "inputPart2" var on your Day class. This will change the file used for part 2 specificially.

```
export default class Day01 extends Day {
    inputPart2 = "input2.txt"
}
```