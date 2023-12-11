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
}

export class Point{
    constructor(public x: number, public y: number, private grid: Grid, public val: string){}

    equals = (point: Point) => this.x === point.x && this.y === point.y
    above = () => this.grid.at(this.x, this.y-1)
    below = () => this.grid.at(this.x, this.y+1)
    left = () => this.grid.at(this.x-1, this.y)
    right = () => this.grid.at(this.x+1, this.y)
}