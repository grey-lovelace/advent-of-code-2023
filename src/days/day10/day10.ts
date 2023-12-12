import Day from "../../utils/day"
import { Direction, turnL, turnR } from "../../utils/directions"
import { Grid, Point } from "../../utils/grid"
import tests from "../../utils/testUtils"
export default class Day10 extends Day {
    expectedPart1Results = () => [
        ["sample.txt", 4],
        ["sample2.txt", 8]
    ]
    expectedPart2Results = () => [
        ["sample3.txt", 4],
        ["sample4.txt", 8],
    ]

    part1(input:string) {
        const path = findPath(input)
        return (path.length)/2
    }

    part2(input:string) {
        const path = findPath(input)

        // Find original direciton of path
        let originalDir = null
        if (path[0].x < path[1].x) originalDir = "E" as Direction
        else if (path[0].x > path[1].x) originalDir = "W" as Direction
        else if (path[0].y < path[1].y) originalDir = "S" as Direction
        else originalDir = "N" as Direction

        // We don't know whether to search to the right or the left,
        // so search one, and if we returned nothing, search the other way.
        let area = findInnerArea(path, [], path[0], originalDir, turnR)
            ?? findInnerArea(path, [], path[0], originalDir, turnL)
        return area?.length
    }
}

const findPath = (input: string) => {
    const grid =  input
        .lines()
        .map(l => l.split(""))
        .let(grid => new Grid(grid))
    const startingPoint =  grid.points.find(p => p.val === "S")!
    return traverse(grid, [startingPoint])!
}

const traverse = (grid: Grid, path: Point[]): Point[] | undefined => {
    const lastPoint = path.at(-1)!
    const rules = [
        {point: lastPoint.north(), validLastVals: ["S","|","J","L"], validVals: ["S","|","F","7"]},
        {point: lastPoint.south(), validLastVals: ["S","|","F","7"], validVals: ["S","|","J","L"]},
        {point: lastPoint.east(), validLastVals: ["S","-","L","F"], validVals: ["S","-","J","7"]},
        {point: lastPoint.west(), validLastVals: ["S","-","7","J"], validVals: ["S","-","L","F"]},
    ]
    for(let rule of rules) {
        if(rule.validLastVals.includes(lastPoint.val)) {
            const point = rule.point
            if (path.length > 2 && point?.val === "S") return path
            if(point && !path.some(pathP => pathP.equals(point)) && rule.validVals.includes(point.val)){
                const potenialPath = traverse(grid, [...path, point])
                if(potenialPath) return potenialPath
            }
        }
    }
}

const turnMapping : Record<Direction,Record<string, typeof turnL>> = {
    "N": {"F": turnR,"7": turnL},
    "S": {"J": turnR,"L": turnL},
    "W": {"L": turnR,"F": turnL},
    "E": {"7": turnR,"J": turnL}
} as const

const findInnerArea = (path: Point[], areaPoints: Point[], currentPoint: Point, currentDir: Direction, getSearchDir: typeof turnL): Point[] | undefined => {
    let nextCurrentDir = currentDir
    // Check if we are turning
    if(!["S", "|","-"].includes(currentPoint.val)) {
        const turn = turnMapping[currentDir][currentPoint.val]
        if(turn) {
            nextCurrentDir = turn(currentDir)
        }
    }

    // Search for area points on current searchDir and next one if we just turned
    [
        ...search(getSearchDir(currentDir), currentPoint, path),
        ...(nextCurrentDir === currentDir ? [] : search(getSearchDir(nextCurrentDir), currentPoint, path))
    ].forEach(point => {
        if(!areaPoints.some(areaP => areaP.equals(point!))) areaPoints.push(point)
    })


    const pathIndex = path.indexOf(currentPoint)
    // If we hit a point on the side of the grid, bail.
    if(areaPoints.some(areaP => areaP.x === 0 || areaP.y === 0)) return undefined
    // If we have reached the end of the path, return area.
    if(path.length-1 === pathIndex) return areaPoints
    // Else, move to next point
    const nextPoint = path[pathIndex+1]
    return findInnerArea(path, areaPoints, nextPoint, nextCurrentDir, getSearchDir)
}

const search = (searchDir: Direction, currentPoint: Point, path: Point[]): Point[] => {
    const areaPoints: Point[] = []
    const dirToFunc = {
        "E": "east",
        "W": "west",
        "N": "north",
        "S": "south"
    } as const
    let nextPoint = currentPoint[dirToFunc[searchDir]]()
    while(nextPoint && !path.some(pathP => pathP.equals(nextPoint!))){
        if(!areaPoints.some(areaP => areaP.equals(nextPoint!))) areaPoints.push(nextPoint)
        nextPoint = nextPoint[dirToFunc[searchDir]]()
    }
    return areaPoints
}

if (import.meta.vitest) {
    tests(new Day10(), __dirname)
}