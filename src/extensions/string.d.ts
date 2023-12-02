interface String {
    paragraphs(this: string): string[]
    lines(this: string): string[]
    parseInt(this: string): number
    findNumbers(this: string): number[]
    matchAllAsList(this: string, regexp: RegExp): RegExpMatchArray[]
}