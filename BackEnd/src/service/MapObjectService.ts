import pool from "../db";
import { MapObjectInterface, MapObjectRowData } from "../type/MapObject";





export async function getMapObjectById(id:number){
    const [rows]=await pool.query<MapObjectRowData[]>("SELECT * FROM map_object id= ?",[id]);
    const result=rows[0]
    return result;
}

export async function getMapObjectByMapId(mapId:number){
    const [rows]=await pool.query<MapObjectRowData[]>("SELECT * FROM map_object id_map= ?",[mapId]);
    return rows;
}

export async function getMapObjectByName(name:string){
const [rows] = await pool.query<MapObjectRowData[]>(
    "SELECT * FROM users WHERE name LIKE ?",[name]);
    return rows;
}

export async function findMapObjectByPartialName(name:string){
    const [rows]=await pool.query<MapObjectRowData[]>("SELECT * FROM map_object name= ?",[name]);
    return rows ;
}

export async function deleteMapObjectById(id:number){
    const [result]=await pool.query("DELETE FROM map_object WHERE id= ?",[id])
    const deleteResult = result as any; // OkPacket
    return deleteResult.affectedRows > 0;
}

export async function createMapObject(mapObject:MapObjectInterface){
        const [result]=await pool.query("INSERT INTO map (name,sprite_path,positionX,positionY,scale,rotation,id_map) VALUES (?,?,?,?,?,?,?)",
            [mapObject.name,mapObject.spritePath,mapObject.position.x,mapObject.position.y,mapObject.scale,mapObject.rotation,mapObject.idMap]);
        const insertResult=result as any;
        return {id:insertResult.insertId,...mapObject};
    }
