export type Direction = "U" | "R" | "D" | "L"
export const directions: Direction[] = ["U", "R", "D", "L"]
export const turnR = (currentDir: Direction) => directions.at((directions.indexOf(currentDir)! + 1) % directions.length)!
export const turnL = (currentDir: Direction) => directions.at((directions.indexOf(currentDir)! - 1) % directions.length)!