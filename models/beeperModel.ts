export enum Status {
    manufactured,
    assembled,
    shipped,
    deployed,
    detonated
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