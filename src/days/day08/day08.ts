import Day from "../../utils/day";
import { primeFactors } from "../../utils/primeFactors";
import tests from "../../utils/testUtils";

export default class Day08 extends Day {
  expectedPart1Results = () => [["sample.txt", 2], ["sample2.txt", 6]]
  expectedPart2Results = () => [["sample3.txt", 6]]

  part1 = (input: string) => findNumOfRuns(
      input,
      node => node.name === "AAA",
      node => node.name === "ZZZ")

  part2 = (input: string) => findNumOfRuns(
      input,
      node => node.name.endsWith("A"),
      node => node.name.endsWith("Z"))
}

class Node {constructor(public name: string, public L: string, public R: string){}}

const findNumOfRuns = (
  input: string,
  isStartingNode: (node: Node) => boolean,
  isEndingNode: (node: Node) => boolean
) => input.lines()
  .let(parseDirectionsAndNodes)
  .let(({directions, nodeMap}) => nodeMap
    .values()
    .filter(isStartingNode)
    .map(node => {
      let i = 0
      while (!isEndingNode(node)) {
        node = nodeMap[node[directions[i % directions.length]]]
        i++
      }
      return i
    })
    .flatMap(primeFactors)
    .unique()
    .product()
  )

const parseDirectionsAndNodes = (lines: string[]) => ({
  directions: lines[0].split("") as ("L" | "R")[],
  nodeMap: lines.slice(2)
    .map(l => l.matchAllAsList(/\w{3}/g)!
      .let(matches => new Node(matches[0][0], matches[1][0], matches[2][0])))
    .associateBy(node => node.name)
})

if (import.meta.vitest) {
  tests(new Day08(), __dirname)
}
