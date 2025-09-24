import { ResultSetHeader } from "mysql2";
import pool from "../db";
import { MapInterface, MapRawData } from "../type/Map";


export async function getAllMaps(): Promise<MapRawData[]> {
  const [rows] = await pool.query<MapRawData[]>("SELECT * FROM map");
  return rows;
}

export async function getMapById(id:number){
    const [rows]=await pool.query<MapRawData[]>("SELECT * FROM map WHERE id = ?",[id]);
    const result=rows [0]
    return result || null;
}

export async function getMapByName(name:string){
    const [rows]=await  pool.query<MapRawData[]>("SELECT * FROM map WHERE name = ?",[name]);
    const result=(rows as MapRawData[])[0]
    return result || null;
}

export async function findMapByPartialName(name:string){
    const [rows]=await  pool.query<MapRawData[]>("SELECT * FROM map WHERE name= ?",[name]);
    return rows as MapRawData[];
}

export async function deleteMapById(id:number){
    const [result]=await  pool.query("DELETE FROM map WHERE id= ?",[id])
    const deleteResult = result as any; // OkPacket
    return deleteResult.affectedRows > 0;
}

export async function createMap(map:MapInterface){
    const [result]=await  pool.query("INSERT INTO map (name,sprite_path) VALUES (?,?)",[map.name,map.spritePath]);
    const insertResult=result as any;
        return {id:insertResult.insertId,...map};
}

export async function editMap(map:MapInterface){
    if (!map.id) {
    throw new Error("Map ID is required for update");
  }

  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE map SET name = ?, sprite_path = ? WHERE id = ?",
    [map.name, map.spritePath, map.id]
  );

  // result.affectedRows te dit si une ligne a bien été modifiée
  return result.affectedRows > 0;
}