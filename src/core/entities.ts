export interface IWeek {
    id: string,
    name: string,
    deadline: Date,
    problems: number
}

export interface IProblem {
    id: string,
    name: string,
    attempts: number,
    week: IWeek,
    limits: ILimits
}

export interface ILimits {
    timeLimit: number,
    memoryLimit: number
}