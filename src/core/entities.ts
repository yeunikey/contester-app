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

export interface IUser {
    uniqueId: string,
    type: string,
    profile: IStudent | ITeacher,
}

export interface IStudent {
    name: string,
    surname: string,
    group: string,
    teacher: string
}

export interface ITeacher {
    name: string,
    surname: string
}