export interface Trip{
    origin:{
        name: string
    },
    destination:{
        name: string
    },
    tripDuration?: number,
    notification?: number,
    active?:boolean,
    distance?:number
}