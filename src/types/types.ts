export type loginParams = {
    email: string,
    passwd: string
}

export type signupParams = {
    name: string,
    email: string,
    passwd: string
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