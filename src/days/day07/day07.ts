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
    const distinctCards = hand.unique()
    const jokerCount = allowJokers ? hand.count(card => card === "J") : 0
    if(distinctCards.length === 1) return 6
    else if(distinctCards.length === 2) {
        if(jokerCount) return 6
        else if(hand.some(card => hand.count(card2 => card2 === card) === 4)) return 5
        else return 4
    }
    else if(distinctCards.length === 3) {
        if(jokerCount === 2) return 5
        if(hand.some(card => hand.count(card2 => card2 === card) ===3)) return jokerCount ? 5 : 3
        else return jokerCount ? 4 : 2
    }
    else if(distinctCards.length === 4) return jokerCount ? 3 : 1
    return jokerCount ? 1 : 0
}

if (import.meta.vitest) {
    tests(new Day07(), __dirname)
}