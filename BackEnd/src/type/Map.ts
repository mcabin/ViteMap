import { RowDataPacket } from "mysql2";

export interface MapRawData extends RowDataPacket{
    id?:number;
    name:string;
    sprite_path:string;
}

export interface MapInterface  {
    id?:number;
    name:string;
    spritePath:string;
}