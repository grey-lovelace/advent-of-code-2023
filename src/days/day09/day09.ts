import Day from "../../utils/day"
import { range } from "../../utils/range"
import tests from "../../utils/testUtils"

export default class Day09 extends Day {
    expectedPart1Results = () => [["sample.txt", 114]]
    expectedPart2Results = () => [["sample.txt", 2]]

    part1 = (input:string) => run(input)
    part2 = (input:string) => run(input, true)
}

const run = (input: string, reverse = false) => input
    .lines()
    .map(l => l.findNumbers())
    .map(nums => reverse ? nums.toReversed() : nums)
    .map(nums => findDifferences(nums, []))
    .map(({nums, startingNums}) => startingNums
        .toReversed()
        .reduce((acc, startingNum) =>
            acc.reduce((acc2, num) =>
                [...acc2, (acc2.at(-1)! + num)]
            , [startingNum])
        , [...nums, nums[0]])
        .at(-1)!
    )
    .sum()

const findDifferences = (nums: number[], startingNums: number[]): {nums: number[], startingNums: number[]} => 
    nums.unique().length == 1 ?
        {nums, startingNums} :
        findDifferences(
            range(0,nums.length-2).map(i => nums[i+1] - nums[i]),
            [...startingNums, nums[0]])

if (import.meta.vitest) {
    tests(new Day09(), __dirname)
}