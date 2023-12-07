import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class Day05 extends Day {
    expectedPart1Results = () => [["sample.txt", 35]]
    expectedPart2Results = () => [["sample.txt", 46]]

    part1(input:string) {
        const seeds = input.lines()[0].findNumbers()
        const instructions = input.let(parseInstructions)
        return seeds.map(s => {
            let current = s
            instructions.forEach(instr => {
                const inputs = instr.find(intr => intr.sourceMin <= current && intr.sourceMax >= current)
                if(inputs) {
                    const diff = current - inputs.sourceMin
                    current = inputs.destMin + diff
                }
            })
            return current
        })
        .min()
    }

    part2(input:string) {
        let seedsRaw = input.lines()[0].findNumbers()
        const seeds = seedsRaw.mapNonNull((seed, i) => 
            i % 2 == 0 ?
            new Seed(seed, seed + seedsRaw[i+1] - 1, 0) :
            null)
        const instructions = input.let(parseInstructions)
        const final: number[] = []
        for (let i = 0; i < seeds.length; i++) {
            instructions.reduce((current, instr, instr_i) => {
                if(instr_i < current.instruction_start) return current
                const inputs = instr.find(intr => intr.sourceMin <= current.min && intr.sourceMax >= current.min)
                if(inputs) {
                    const minDiff = current.min - inputs.sourceMin
                    if(current.max <= inputs.sourceMax) {
                        // matches fully
                        return new Seed(inputs.destMin + minDiff, inputs.destMin + current.max - inputs.sourceMin, current.instruction_start)
                    } else {
                        // matches partially starting from min
                        seeds.push(new Seed(inputs.sourceMax + 1, current.max, instr_i))
                        return new Seed(inputs.destMin + minDiff, inputs.destMax, current.instruction_start)
                    }
                } 
                const instrInSeedRange = instr.find(intr => intr.sourceMin >= current.min && intr.sourceMax <= current.max)
                if(instrInSeedRange) {
                    // matches partially starting from max
                    seeds.push(new Seed(instrInSeedRange.sourceMin, current.max, instr_i))
                    return new Seed(current.min, instrInSeedRange.sourceMin-1, current.instruction_start)
                }
                // no matches
                return current
            }, seeds[i])
            .let(seed => final.push(seed.min))
        }
        return final.min()
    }
} 

class Seed {constructor(
    public min: number, public max: number, public instruction_start: number
) {}}

const parseInstructions = (input: string) => input.paragraphs()
    .map(p => p.lines().slice(1)
        .map(l => l.findNumbers())
        .map(l => ({
            destMin: l[0],
            sourceMin: l[1],
            destMax: l[0]+l[2]-1,
            sourceMax: l[1]+l[2]-1
        }))
    )

if (import.meta.vitest) {
    tests(new Day05(), __dirname)
}