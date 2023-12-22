export type loginParams = {
    email: string,
    passwd: string
}

export interface IUser {
    name?: string,
    email: string
}

export type JobType = {
    id: string,
    title: string,
    company: string,
    desc: string,
    type: string,
    experience: string,
    location: string,
    skills: string[]
    posted: Date,
}