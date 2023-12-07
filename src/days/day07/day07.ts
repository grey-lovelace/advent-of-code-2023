import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class Day07 extends Day {
    expectedPart1Results = () => [["sample.txt", 6440]]
    expectedPart2Results = () => [["sample.txt", 5905]]

    part1 = (input:string) => playGame(input, false, "23456789TJQKA".split(""))
    part2 = (input:string) => playGame(input, true, "J23456789TQKA".split(""))
}

const playGame = (input:string, allowJokers: boolean, tiebreaker: string[]) => 
    input.lines()
        .map(l => l.split(" "))
        .map(l => ({
            hand: l[0].split(""),
            bid: l[1].parseInt(),
            score: scoreHand(l[0].split(""), allowJokers)
        }))
        .toSorted((a, b) => 
            a.score - b.score
            || tiebreaker.indexOf(a.hand[0]) - tiebreaker.indexOf(b.hand[0])
            || tiebreaker.indexOf(a.hand[1]) - tiebreaker.indexOf(b.hand[1])
            || tiebreaker.indexOf(a.hand[2]) - tiebreaker.indexOf(b.hand[2])
            || tiebreaker.indexOf(a.hand[3]) - tiebreaker.indexOf(b.hand[3])
            || tiebreaker.indexOf(a.hand[4]) - tiebreaker.indexOf(b.hand[4]))
        .map((round, i ) => round.bid * (i+1))
        .sum()

const scoreHand = (hand: string[], allowJokers: boolean) => {
    const distinct = hand.unique().length
    const jokers = allowJokers ? hand.count(card => card === "J") : 0
    if(distinct === 1) return 6
    if(distinct === 2) {
        if(jokers) return 6
        if(hand.some(card => hand.count(card2 => card2 === card) === 4)) return 5
        return 4
    }
    if(distinct === 3) {
        if(jokers === 2) return 5
        if(hand.some(card => hand.count(card2 => card2 === card) ===3)) return jokers ? 5 : 3
        return jokers ? 4 : 2
    }
    if(distinct === 4) return jokers ? 3 : 1
    return jokers ? 1 : 0
}

if (import.meta.vitest) {
    tests(new Day07(), __dirname)
}