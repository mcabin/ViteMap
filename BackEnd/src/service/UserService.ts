import pool from "../db";
import bcrypt from "bcrypt";
import { UserInterface, UserRawData } from "../type/User";





async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // plus c'est élevé, plus c'est sécurisé (mais lent)
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createUser(user:UserInterface){
    
    const hashedPW=await hashPassword(user.password);
    const [result]=await pool.query<UserRawData[]>("INSERT INTO user (name,password,admin) VALUES (?,?,?)",[user.name,hashedPW,user.admin]);
    const insertResult=result as any;
        return {id:insertResult.insertId,...user};
}

export async function deleteUser(id:number){
    const [result]=await pool.query("DELETE FROM user WHERE id= ?",[id])
    const deleteResult = result as any; // OkPacket
    return deleteResult.affectedRows > 0;
}

export async function findUserByName(name:string){
    const [rows]=await pool.query<UserRawData[]>("SELECT * FROM user WHERE name = ?",[name]);
    const result=rows [0]
    return result || null;
}

export async function getAllUsers(){
    const [rows]=await pool.query<UserRawData[]>("SELECT * FROM user");
    return rows;
    
}

export async function checkUser(name:string,password:string){
    const user:UserRawData=await findUserByName(name);
    if(user==null){
        return null;
    }
    if (await verifyPassword(password,user.password)){
            return user;
    }
    return null;
    
    
}