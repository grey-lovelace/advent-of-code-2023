import { range } from "d3"
import Day from "../../utils/day"
import { Grid, Point } from "../../utils/grid"
import tests from "../../utils/testUtils"

export default class Day11 extends Day {
    expectedPart1Results = () => [["sample.txt", 374]]
    expectedPart2Results = () => []

    part1 = (input:string) => findDistances(input, 2)
    part2 = (input:string) => findDistances(input, 1000000)
}

const findDistances = (input: string, expansionFactor: number) => {
    const grid = input.lines()
        .map(l => l.split(""))
        .let(grid => new Grid(grid))

    // Expand Space
    const expansions = [
        {max: grid.maxY, axis: "y"},
        {max: grid.maxX, axis: "x"}
    ] as const
    expansions.forEach(({max, axis}) => range(0, max)
        .filter(i => grid.points
            .filter(point => point[axis] === i)
            .every(point => point.val === "."))
        .map((num, i) => num + i*(expansionFactor-1))
        .forEach(rowNum => grid.points
            .filter(point => point[axis] >= rowNum)
            .forEach(point => point[axis] += expansionFactor - 1)))

    // Find
    const galaxies = grid.points.filter(point => point.val ==="#")
    return galaxies.flatMap((g, i) => 
        galaxies.slice(i+1).map(g2 => g.manhattanDistance(g2))
    ).sum()
}

if (import.meta.vitest) {
    tests(new Day11(), __dirname)
}