import { range } from "d3";
import Day from "../../utils/day";

export default class Day04 extends Day {
  expectedPart1Results = () => [["sample.txt", 13]];
  runPart1 = true;
  expectedPart2Results = () => [["sample.txt", 30]];
  runPart2 = true;

  part1(input: string) {
    return input.lines()
      .map(l => l.slice(8).split("|").map((s) => s.findNumbers()))
      .map(nums => nums[0].filter((num) => nums[1].includes(num)).length)
      .map(wins => (wins == 0 ? 0 : 2**(wins - 1)))
      .sum();
  }

  part2(input: string) {
    const cards = input.lines().map((l) => ({
      cardNum: l.findNumbers()[0],
      nums: l.slice(8).split("|").map((s) => s.findNumbers()),
      instances: 1,
    }))
    return cards.map((card) => {
      const wins = card.nums[0].filter((num) => card.nums[1].includes(num)).length;
      range(0, wins)
        .map((w) => cards[card.cardNum + w])
        .forEach(next => next.instances += card.instances)
      return card.instances;
    })
    .sum()
  }

  part2Functional(input: string) {
    return input
      .lines()
      .map((l) => ({
        cardNum: l.findNumbers()[0],
        nums: l.slice(8).split("|").map((s) => s.findNumbers()),
        instances: 1,
      }))
      .let(cards => cards
        .look(card => card.nums[0]
          .filter(num => card.nums[1].includes(num))
          .length
          .let(wins => range(0, wins)
            .map(w => cards[card.cardNum + w])
            .forEach(next => next.instances += card.instances)))
        .map(card => card.instances)
        .sum())
  }
}