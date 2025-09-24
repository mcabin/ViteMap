import { Request, Response } from "express";
import * as map_objec_service from "../service/MapObjectService"
import { MapObjectInterface, MapObjectRowData } from "../type/MapObject";

function transformMapObjectMap(map: MapObjectRowData): MapObjectInterface {
    return {
        id: map.id,
        name: map.name,
        spritePath: map.sprite_path,
        rotation: map.rotation,
        scale: map.scale,
        position: {
            x: map.positionX,
            y: map.positionY
        },
        idMap: map.id_map
    };
}

export async function getMapObjectById(req: Request, res: Response) {
    try {
        const rep = await map_objec_service.getMapObjectById(Number(req.params.id));
        if (!rep) return res.status(404).json({ error: "Map object not found" });

        res.json(transformMapObjectMap(rep));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch map object" });
    }
}

export async function getMapObjectByMapId(req: Request, res: Response) {
    try {
        const reps = await map_objec_service.getMapObjectByMapId(Number(req.params.id));
        res.json(reps.map(transformMapObjectMap) as MapObjectInterface[]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch map object" });
    }
}

export async function getMapObjectByName(req: Request, res: Response) {
    try {
        const reps = await map_objec_service.getMapObjectByName(req.params.name);
        res.json(reps.map(transformMapObjectMap) as MapObjectInterface[]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch map object" });
    }
}

export async function findMapObjectByPartialName(req: Request, res: Response) {
    try {
        const reps = await map_objec_service.findMapObjectByPartialName(req.params.name);
        res.json(reps.map(transformMapObjectMap) as MapObjectInterface[]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch map object" });
    }
}

export async function deleteMapObjectById(req: Request, res: Response) {
    try {
        const success = await map_objec_service.deleteMapObjectById(Number(req.params.id));
        if (!success) return res.status(404).json({ error: "Map object not found" });
        res.status(204).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete map object" });
    }
}

export async function createMapObject(req: Request, res: Response) {
    try {
        const idMap = Number(req.body.id_map)
        if (isNaN(idMap)) return res.status(400).json({ error: "Invalid idMap for map object" });
        const obj: MapObjectInterface = {
            name: req.body.name,
            spritePath: req.body.spritePath,
            rotation: req.body.rotation,
            scale: req.body.scale,
            position: { x: req.body.position.x, y: req.body.position.y },
            idMap: idMap
        };
        const newMapObject = await map_objec_service.createMapObject(obj);
        if (!newMapObject) return res.status(404).json({ error: "Map object creation failed" });
        res.json(newMapObject);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create map object" });
    }
}

export async function updateMapObject(req: Request, res: Response) {
    try {
        const idMap = Number(req.body.id_map)
        if (isNaN(idMap)) return res.status(400).json({ error: "Invalid idMap for map object" });
        const id = Number(req.body.id)
        if (isNaN(idMap)) return res.status(400).json({ error: "Invalid id for map object" });
        const obj: MapObjectInterface = {
            name: req.body.name,
            spritePath: req.body.spritePath,
            rotation: req.body.rotation,
            scale: req.body.scale,
            position: { x: req.body.position.x, y: req.body.position.y },
            idMap: idMap,
            id: id
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Failed to edit map object"})
    }
    
}