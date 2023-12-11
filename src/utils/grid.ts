export class Grid {
    constructor(matrix: string[][]) {
        this.maxX = matrix[0].length-1
        this.maxY = matrix.length-1
        this.pointMatrix = matrix.map((row, y) =>
            row.map((cell, x) => new Point(x, y, this, cell))
        )
        this.points = this.pointMatrix.flat()
    }
    maxX: number
    maxY: number
    pointMatrix: Point[][]
    points: Point[]
    at(x: number, y: number): Point | undefined {
        if(x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY) return this.pointMatrix[y][x]
    }
    bfs = (start: Point, end: Point) => {
        // Reset if running this multiple times
        this.points.forEach(point => {
            point.distance = undefined
            point.visited = false
        })
        start.distance = 0
        while (!end.distance) {
            const unvisited = this.points.filter(point => !point.visited && point.distance != null)
            const minDist = unvisited.map(point => point.distance!).min()
            const low = unvisited.find(point => point.distance === minDist)!
            low.adjPoints().forEach( adj => {
                if(adj) {
                    const toAdj = low.distance! + 1
                    if(toAdj < (adj.distance ?? 9999999)){ 
                        adj.distance = toAdj
                    } 
                }
            })
            low.visited = true
        }
        return {...end}
    }
}

export class Point{
    constructor(public x: number, public y: number, public grid: Grid, public val: string){}
    distance: number | undefined = undefined
    visited = false
    equals = (point: Point) => this.x === point.x && this.y === point.y
    above = () => this.grid.at(this.x, this.y-1)
    below = () => this.grid.at(this.x, this.y+1)
    left = () => this.grid.at(this.x-1, this.y)
    right = () => this.grid.at(this.x+1, this.y)
    adjPoints = () => [this.above(), this.below(), this.left(), this.right()]
    toString = () => JSON.stringify({x: this.x, y: this.y, val: this.val})
}