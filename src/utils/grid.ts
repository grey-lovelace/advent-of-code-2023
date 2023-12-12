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

    findPath = (
        isStartingPoint: (point: Point) => boolean,
        isEndingPoint: (point: Point) => boolean,
        isAdjPoint: (currentPoint: Point, adjCandidate: Point, grid: Grid) => boolean
            = (currentPoint, adjCandidate) => currentPoint.orthogonalPoints().some(point => point.equals(adjCandidate)),
        calcDistance: (currentPoint: Point, adjCandidate: Point, grid: Grid) => number
            = () => 1
    ): Point => {
        // Reset if running this multiple times
        this.points.forEach(point => {
            point.distance = undefined
            point.visited = false
        })
        this.points.filter(isStartingPoint)
            .forEach(startingPoint => startingPoint.distance = 0)
        const endPoints = this.points.filter(isEndingPoint)
        while (endPoints.every(point => point.distance == undefined)) {
            const unvisited = this.points.filter(point => !point.visited && point.distance != null)
            const minDist = unvisited.map(point => point.distance!).min()
            const low = unvisited.find(point => point.distance === minDist)!
            this.points
                .filter(point => isAdjPoint(low,point,this))
                .forEach(adj => {
                    const distanceToPoint = calcDistance(low, adj, this)
                    const toAdj = low.distance! + distanceToPoint
                    if(toAdj < (adj.distance ?? Number.MAX_VALUE)){ 
                        adj.distance = toAdj
                    }})
            low.visited = true
        }
        return {...endPoints.find(point => !!point.distance)!}
    }
}

export class Point{
    constructor(public x: number, public y: number, public grid: Grid, public val: string){}
    distance: number | undefined = undefined
    visited = false
    equals = (point: Point) => this.x === point.x && this.y === point.y
    north = () => this.grid.at(this.x, this.y-1)
    south = () => this.grid.at(this.x, this.y+1)
    west = () => this.grid.at(this.x-1, this.y)
    east = () => this.grid.at(this.x+1, this.y)
    northeast = () => this.grid.at(this.x+1, this.y-1)
    southeast = () => this.grid.at(this.x+1, this.y+1)
    northwest = () => this.grid.at(this.x-1, this.y-1)
    southwest = () => this.grid.at(this.x-1, this.y+1)
    orthogonalPoints= () => [this.north(), this.south(), this.west(), this.east()].filter(it => it != null) as Point[]
    diagonalPoints = () => [this.northeast(), this.southeast(), this.northwest(), this.southwest()].filter(it => it != null) as Point[]
    toString = () => JSON.stringify({x: this.x, y: this.y, val: this.val})
    manhattanDistance = (point: Point) => Math.abs(this.x - point.x) + Math.abs(this.y - point.y)
}