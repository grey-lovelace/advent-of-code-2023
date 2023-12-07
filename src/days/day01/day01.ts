import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class Day01 extends Day {
    expectedPart1Results = () => [["sample.txt", 142]]
    expectedPart2Results = () => [["sample2.txt", 281]]

    part1(input:string) {
        return input.lines()
            .map(l => l.findNumbers().join())
            .map(l => l[0] + l.slice(-1))
            .toInts()
            .sum()
    }

    part2(input:string) {
        return input.lines()
            .map(l => [...l.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g)])
            .map(l => l.map(match => numMap[match[1]] ?? match[1]))
            .map(l => l[0] + l.slice(-1))
            .toInts()
            .sum()
    }
}

const numMap: Record<string, string> = {
    one:"1",
    two:"2",
    three:"3",
    four:"4",
    five:"5",
    six:"6",
    seven:"7",
    eight:"8",
    nine:"9"
}

if (import.meta.vitest) {
    tests(new Day01(), __dirname)
}