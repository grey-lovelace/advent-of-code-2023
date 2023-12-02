import Day from "../../utils/day";

export default class Day02 extends Day {
  expectedPart1Results = () => [["sample.txt", 8]]
  expectedPart2Results = () => [["sample.txt", 2286]]

  part1(input: string) {
    const regex = /Game (\d+)(?!.*(?:(?:[2-9]\d|\d{3,})|1[3-9] red|1[4-9] green|1[5-9] blue))/
    return input.lines()
      .mapNonNull(line => line.match(regex)?.at(1).parseInt())
      .sum()
  }

  part2(input: string) {
    return input.lines()
      .map(line => line
        .matchAllAsList(/(\d+) (red|green|blue)/g)
        .map(match => ({
          amount: parseInt(match[1]),
          color: match[2]
        }))
        .groupedBy(
          pull => pull.color,
          pull => pull.amount
        )
        .entries()
        .map(([_color, amounts]) => amounts.max())
        .product()
      ).sum()
  }
}