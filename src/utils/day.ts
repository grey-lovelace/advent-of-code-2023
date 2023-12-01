export default abstract class Day {
    abstract expectedPart1Results(): any[][]
    abstract expectedPart2Results(): any[][]
    abstract part1(input: string): any
    abstract part2(input: string): any
    // Sometimes if things are not going well, want to easily shut off running the main parts. These do that.
    runPart1 = true
    runPart2 = true
    // Sometimes we need to change the input between part 1 and part 2.
    inputPart1 = "input.txt"
    inputPart2 = "input.txt"
}