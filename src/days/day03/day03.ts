import Day from "../../utils/day"
import { range } from "../../utils/range"

export default class Day03 extends Day {
    expectedPart1Results = () => [["sample.txt", 4361],["sample2.txt", 7634]]
    expectedPart2Results = () => [["sample.txt", 467835]]

    part1(input:string) {
        const symbols = parseSymbols(input)
        return parseNumbers(input)
            .filter(n => symbols.some(s => n.isAdjacent(s)))
            .map(n => n.value.parseInt())
            .sum()
    }

    part2(input:string) {
        const nums = parseNumbers(input)
        return parseSymbols(input)
            .map(s => nums.filter(n => n.isAdjacent(s)))
            .filter(maybeGearNums => maybeGearNums.length === 2)
            .map(gearNums => gearNums.map(n => n.value.parseInt()).product())
            .sum()
    }
}

class SymbolOrNumber {
    value!: string
    line!: number
    index!: number

    isAdjacent = (s: SymbolOrNumber) => 
        range(this.line-1, this.line+2).includes(s.line) &&
        range(this.index-1, this.index + this.value.length + 1).includes(s.index)
    
}

const parseNumbers = (input: string) => parse(input, /\d+/g)
const parseSymbols = (input: string) => parse(input, /[^\d\.]/g)
const parse = (input: string, pattern: RegExp) => input.lines()
    .map(l => l.matchAllAsList(pattern))
    .flatMap((matches, i) => matches.map(match => Object.assign(new SymbolOrNumber(), {
        value: match[0],
        index: match.index,
        line: i
    })))