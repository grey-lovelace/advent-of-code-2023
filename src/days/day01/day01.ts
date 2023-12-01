import Day from "../../utils/day"

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
            .map(l => l
                // Use lookahead to create "duplicates" of overlapping numbers
                .replace(/(?=(one|two|three|four|five|six|seven|eight|nine))/g,"$1")
                // Replace with the real numbers
                .replace(/one/g,"1")
                .replace(/two/g,"2")
                .replace(/three/g,"3")
                .replace(/four/g,"4")
                .replace(/five/g,"5")
                .replace(/six/g,"6")
                .replace(/seven/g,"7")
                .replace(/eight/g,"8")
                .replace(/nine/g,"9")
            )
            .map(l => l.findNumbers().join())
            .map(l => l[0] + l.slice(-1))
            .toInts()
            .sum()
    }
}