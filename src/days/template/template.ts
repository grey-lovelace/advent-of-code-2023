import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class TemplateDay extends Day {
    expectedPart1Results = () => [["sample.txt", 0]]
    runPart1 = true
    expectedPart2Results = () => [["sample.txt", 0]]
    runPart2 = false

    part1(input:string) {
        return 0
    }

    part2(input:string) {
        return 0
    }
}

if (import.meta.vitest) {
    tests(new TemplateDay(), __dirname)
}