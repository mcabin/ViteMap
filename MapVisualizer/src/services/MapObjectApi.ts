import type { MapObjectModel } from "../components/map/MapObject";

const API_URL=import.meta.env.VITE_API_URL;

export async function getMapObjectsOfMap(id_map:number):Promise<MapObjectModel[]>{
    const res=await fetch(`${API_URL}/mapObject/map/${id_map}`,{method:"GET"});
    if (!res.ok) throw new Error("Failed to fetch maps ojects!");
    return res.json();
}

export async function getMapObject(id:number):Promise<MapObjectModel>{
    const res=await fetch(`${API_URL}/mapObject/${id}`,{method:"GET"});
    if (!res.ok) throw new Error("Failed to map Object!");
    return res.json();
}

export async function createMapObject(obj:Omit<MapObjectModel,"id">):Promise<MapObjectModel>{
    const res=await fetch(`${API_URL}/mapObject`,
        {method:"GET",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(obj)
});
    if (!res.ok) throw new Error("Failed to create map object!");
    return res.json();
}

export async function deleteMapObject(id:number){
    const res=await fetch(`${API_URL}/mapObject/${id}`,{method:"DELETE"});
    if (!res.ok) throw new Error("Failed to delete mapObject!");
    return res.json();
}

export async function getMapByName(name:string):Promise<MapObjectModel>{
    const res=await fetch(`${API_URL}/mapObject/name/${name}`,{
        method:"GET",
    });
        if (!res.ok) throw new Error("Failed to fetch map with name: "+name);
    return res.json();
}

export async function findMapByName(name:string):Promise<MapObjectModel>{
    const res=await fetch(`${API_URL}/mapObject/fName/${name}`,{
        method:"GET",
    });
        if (!res.ok) throw new Error("Failed to find map with name: "+name);
    return res.json();
}