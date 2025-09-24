import { RowDataPacket } from "mysql2";

export interface MapObjectRowData extends RowDataPacket{
    id?:number;
    name:string;
    sprite_path:string;
    positionX:number;
    positionY:number;
    scale:number;
    rotation:number;
    id_map:number;
}

export interface MapObjectInterface{
    id?: number;
  name: string;
  spritePath: string;
  rotation:number;
  scale:number;
  position: { x: number; y: number };
  idMap:number;
}