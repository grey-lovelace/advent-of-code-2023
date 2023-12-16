import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class Day15 extends Day {
    expectedPart1Results = () => [["sample.txt", 1320]]
    expectedPart2Results = () => [["sample.txt", 145]]

    part1 = (input:string) => input
        .split(",")
        .map(hashAlg)
        .sum()
    part2 = (input:string) => input
        .split(",")
        .map(code => code.split(/[=\-]/))
        .map(data => new Step(data[0], data[1].parseInt()))
        .reduce<Record<number, Step[]>>((acc, step) => {
            const boxContents = acc[step.box] ?? []
            const existingStep = boxContents.find(item => item.label === step.label)
            if(step.focalLength) {
                if (existingStep) existingStep.focalLength = step.focalLength
                else acc[step.box] = [...boxContents, step]
            } else if (existingStep) {
                acc[step.box] = boxContents.filter(item => item !== existingStep)
            }
            return acc
        }, {})
        .entries()
        .flatMap(([_, steps]) => steps.map((step, i) => (step.box+1) * (i+1) * step.focalLength!))
        .sum()
}

class Step {
    public box: number
    constructor(public label: string, public focalLength: number){
        this.box = hashAlg(label)
    }
}

const hashAlg = (code: string) => code
    .split("")
    .map(char => char.charCodeAt(0))
    .reduce((acc, asciiCode) => ((acc + asciiCode) * 17) % 256, 0)

if (import.meta.vitest) {
    tests(new Day15(), __dirname)
}