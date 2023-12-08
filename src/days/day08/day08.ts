import Day from "../../utils/day";
import { primeFactors } from "../../utils/primeFactors";
import tests from "../../utils/testUtils";

export default class Day08 extends Day {
  expectedPart1Results = () => [["sample.txt", 2], ["sample2.txt", 6]]
  expectedPart2Results = () => [["sample3.txt", 6]]

  part1(input: string) {
    const {directions, nodes} = parseDirsAndNodes(input)
    let node = nodes["AAA"]
    let i = 0
    while (node.name !== "ZZZ") {
      node = nodes[node[directions[i % directions.length]]]
      i++
    }
    return i
  }

  part2(input: string) {
    const {directions, nodes} = parseDirsAndNodes(input)
    return nodes
      .values()
      .filter(node => node.name.endsWith("A"))
      .map(node => {
        let i = 0
        while (!node.name.endsWith("Z")) {
          node = nodes[node[directions[i % directions.length]]]
          i++
        }
        return i
      })
      .flatMap(primeFactors)
      .unique()
      .product()
  }
}

const parseDirsAndNodes = (input: string) => input.lines()
  .let(lines => ({
    directions: lines[0].split("") as ("L" | "R")[],
    nodes: lines.slice(2)
      .map(l => l.matchAllAsList(/[\w]{3}/g)!
        .let(matches => ({
          name: matches[0][0],
          L: matches[1][0],
          R: matches[2][0],
        })))
      .associateBy(node => node.name)
  }))

if (import.meta.vitest) {
  tests(new Day08(), __dirname)
}
