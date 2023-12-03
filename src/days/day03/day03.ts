import Day from "../../utils/day"
import { range } from "../../utils/range"

export default class Day03 extends Day {
    expectedPart1Results = () => [["sample.txt", 4361],["sample2.txt", 7634]]
    expectedPart2Results = () => [["sample.txt", 467835]]

    part1(input:string) {
        const partNums = parse(input, /\d+/g)
        const symbols = parse(input, /[^\d\.]/g)
        return partNums
            .filter(partNum => symbols.some(symbol => partNum.isAdjacentTo(symbol)))
            .map(partNum => partNum.val.parseInt())
            .sum()
    }

    part2(input:string) {
        const partNums = parse(input, /\d+/g)
        const gearSymbols = parse(input, /[*]/g)
        return gearSymbols
            .map(symbol => partNums.filter(partNum => partNum.isAdjacentTo(symbol)))
            .filter(maybeGearNums => maybeGearNums.length === 2)
            .map(gearNums => gearNums.map(n => n.val.parseInt()).product())
            .sum()
    }
}

class GridItem {
    x!: number; y!: number; val!: string

    isAdjacentTo = (s: GridItem) => 
        range(this.x-1, this.x + this.val.length).includes(s.x) &&
        range(this.y-1, this.y+1).includes(s.y)
}

const parse = (input: string, pattern: RegExp) => input.lines()
    .map(l => l.matchAllAsList(pattern))
    .flatMap((matches, i) => matches.map(match => Object.assign(
        new GridItem(), {
            val: match[0],
            x: match.index,
            y: i
        })))