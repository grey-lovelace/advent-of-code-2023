import Day from "../../utils/day"
import { range } from "../../utils/range"
import tests from "../../utils/testUtils"

export default class Day06 extends Day {
    expectedPart1Results = () => [["sample.txt", 288]]
    runPart1 = true
    expectedPart2Results = () => [["sample.txt", 71503]]
    runPart2 = true

    part1(input:string) {
        return input.lines()
            .map(l => l.findNumbers())
            .let(lines => 
                lines[0].map((l,i) => ({
                    time: l,
                    record: lines[1][i]
                })))
            .map(findWins)
            .product()
    }

    part2(input:string) {
        return input.lines()
            .map(l => l.findNumbers().join("").parseInt())
            .let(lines => ({
                time: lines[0],
                record: lines[1]
            }))
            .let(findWins)
    }
}

const findWins = (race: any) =>
    range(0, race.time)
        .map(t => t*(race.time-t))
        .filter(distance => distance > race.record)
        .length

if (import.meta.vitest) {
    tests(new Day06(), __dirname)
}