import { RowDataPacket } from "mysql2";

export interface UserRawData extends RowDataPacket{
    id?:number,
    name:string,
    password:string,
    admin:boolean
}

export interface UserInterface{
    id?:number,
    name:string,
    password:string,
    admin:boolean
}