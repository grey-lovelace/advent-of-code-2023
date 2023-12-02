import Day from "../../utils/day";

export default class Day02 extends Day {
  expectedPart1Results = () => [["sample.txt", 8]];
  expectedPart2Results = () => [["sample.txt", 2286]];

  part1(input: string) {
    return input
      .let(parseGames)
      .filter((game) =>
        game.pulls.every((pull) => pull.amount < limits[pull.color])
      )
      .map((game) => game.id)
      .sum();
  }

  part2(input: string) {
    return input
      .let(parseGames)
      .map((game) =>
        game.pulls
          .groupedBy(
            (pull) => pull.color,
            (pull) => pull.amount
          )
          .entries()
          .map((entry) => entry[1].max())
          .product()
      )
      .sum();
  }
}

const limits: Record<string, number> = { red: 12, green: 13, blue: 14 };

const parseGames = (input: string) => {
  return input
    .lines()
    .map((l) => l.split(":"))
    .map((l) => ({
      id: l[0].findNumbers()[0],
      pulls: l[1]
        .split(/[;,]/)
        .map((pull) => pull.trim().split(" "))
        .map((pull) => ({
          color: pull[1],
          amount: parseInt(pull[0]),
        })),
    }));
};
