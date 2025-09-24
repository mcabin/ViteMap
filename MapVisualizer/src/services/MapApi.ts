import type { MapModel } from "../components/map/Map";

const API_URL=import.meta.env.VITE_API_URL;

export async function getAllMaps(): Promise<MapModel[]> {
  try {
    const res = await fetch(`${API_URL}/map`);
    if (!res.ok) throw new Error(`Failed to fetch maps! Status: ${res.status}`);
    const data=await res.json();
    console.log(data);
    return (data) as MapModel[];
  } catch (err) {
    console.error("Error fetching maps:", err);
    throw err;
  }
}

export async function createMap(obj:Omit<MapModel,"id">):Promise<MapModel>{
    const res=await fetch(`${API_URL}/map`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(obj)
    });
    if (!res.ok) throw new Error("Failed to create map!");
    return res.json();
}

export async function getMap(id:number):Promise<MapModel>{
    const res=await fetch(`${API_URL}/map/${id}`,{
        method:"GET",
    });
        if (!res.ok) throw new Error("Failed to fetch map with id: "+id);
    return res.json();
}

export async function getMapByName(name:string):Promise<MapModel>{
    const res=await fetch(`${API_URL}/map/name/${name}`,{
        method:"GET",
    });
        if (!res.ok) throw new Error("Failed to fetch map with name: "+name);
    return res.json();
}

export async function findMapByName(name:string):Promise<MapModel>{
    const res=await fetch(`${API_URL}/map/fName/${name}`,{
        method:"GET",
    });
        if (!res.ok) throw new Error("Failed to find map with name: "+name);
    return res.json();
}

export async function deleteMap(id:number):Promise<MapModel>{
    const res=await fetch(`${API_URL}/map/${id}`,{
        method:"DELETE",
    });
        if (!res.ok) throw new Error("Failed to delete map with name: "+name);
    return res.json();
}