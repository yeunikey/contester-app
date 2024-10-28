export interface IWeek {
    uniqueId: string,
    name: string,
    closed: boolean,
    startDate: Date,
    deadlineDate: Date,
    problems: string[] | IProblem[]
}

export interface IProblem {
    uniqueId: string,
    weekId: string,
    title: string,
    lore: string,
    limits: ILimits,
    tests: ITest[],
    correctCode: string | null
}

export interface ITest {
    input: string[],
    output: string[]
}

export interface ILimits {
    timeLimit: number,
    memoryLimit: number
}

export interface IUser {
    uniqueId: string,
    type: string,
    profile: IStudent | ITeacher,
    role: "USER" | "ADMIN"
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

export interface ICode {
    codeId: string,
    languageType: string,
    status: string
}

export interface IAttempt {
    attemptId: string,
    userId: string,
    problemId: string,
    createdDate: Date,
    code: ICode
}