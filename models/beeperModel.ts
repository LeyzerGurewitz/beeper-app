export enum Status {
    manufactured = "manufactured",
    assembled = "assembled",
    shipped = "shipped",
    deployed = "deployed",
    detonated = "detonated"
}

export interface Beeper  {
    id?: string,
    name: string,
    status: Status,
    createAt: Date,
    detonatedAt?: Date,
    latitude?: Number,
    longitude?: Number
}