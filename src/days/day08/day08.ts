import Day from "../../utils/day"
import tests from "../../utils/testUtils"

export default class Day08 extends Day {
    expectedPart1Results = () => [["sample.txt", 2],["sample2.txt", 6]]
    runPart1 = true
    expectedPart2Results = () => [["sample3.txt", 6]]
    runPart2 = true

    part1(input:string) {
        const data =  input
            .lines()
            .let(lines => ({
                instr: lines[0].split(""),
                nodes: lines.slice(2).map(l => 
                    l.match(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/)!
                        .let(match => ({
                            node: match[1],
                            L: match[2],
                            R: match[3]
                        })))
            }))
        const nodes = data.nodes.groupedBy(node => node.node)

        let node = nodes["AAA"][0]
        let i = 0
        while(node.node !== "ZZZ") {
            node = nodes[node[data.instr[i%data.instr.length]]][0]
            i++
        }
        return i
    }

    part2(input:string) {
        const data =  input
            .lines()
            .let(lines => ({
                instr: lines[0].split(""),
                nodes: lines.slice(2).map(l => 
                    l.match(/([\dA-Z]{3}) = \(([\dA-Z]{3}), ([\dA-Z]{3})\)/)!
                        .let(match => ({
                            node: match[1],
                            L: match[2],
                            R: match[3]
                        })))
            }))
        const nodes = data.nodes.groupedBy(node => node.node)

        const nums = nodes.entries().map(([k,v]) => v[0]).filter(node => node.node.endsWith("A")).look()
            .map(node => {
                let i = 0
                while(!node.node.endsWith("Z")) {
                    node = nodes[node[data.instr[i%data.instr.length]]][0]
                    i++
                }
                return i
            })
            .look()

        const max = nums.max()
        let current = max
        while(!nums.every(num => current%num === 0)) {
            current += max
        }
        return current
    }
}

if (import.meta.vitest) {
    tests(new Day08(), __dirname)
}