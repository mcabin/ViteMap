import { Request, Response } from "express";
import * as mapService from "../service/MapService"
import { MapInterface, MapRawData } from "../type/Map";

function toMapInterface(raw: MapRawData): MapInterface {
    return {
        name: raw.name,
        id: raw.id,
        spritePath: raw.sprite_path
    }
}
export async function getMapById(req: Request, res: Response) {
    try {
        const map = await mapService.getMapById(Number(req.params.id));
        if (!map) return res.status(404).json({ error: "Map not found" });
        res.json(toMapInterface(map));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch map" })
    }

}

export async function getAllMaps(req: Request, res: Response) {
    try {
        const maps = await mapService.getAllMaps();
        res.json(maps.map(toMapInterface) as MapInterface[]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch maps" })
    }
}

export async function getMapByName(req: Request, res: Response) {
    try {
        const map = await mapService.getMapByName(req.params.name);
        res.json(toMapInterface(map));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch map" })
    }
}

export async function findMapByPartialName(req: Request, res: Response) {
    try {
        const maps = await mapService.findMapByPartialName(req.params.name);
        res.json(maps.map(toMapInterface) as MapInterface[]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch map" })
    }

}

export async function deleteMapById(req: Request, res: Response) {
    try {
        const success = await mapService.deleteMapById(Number(req.params.id));
        if (!success) return res.status(404).json({ error: "Remove map failed" });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete map" })
    }
}

export async function createMap(req: Request, res: Response) {
    
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const obj: MapInterface = {
            name: req.body.name,
            spritePath: req.file.path,
        };
        const newMap = await mapService.createMap(obj);
        if (!newMap) return res.status(404).json({ error: "Map creation failed" });
        res.json(newMap);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create map" })
    }
}

export async function editMap(req: Request, res: Response) {
    try {
        const id=Number(req.body.id)
        if (isNaN(id)) return res.status(400).json({ error: "Invalid id for map object" });
        const obj:MapInterface={
            name: req.body.name,
            spritePath:req.body.spritePath,
            id: id
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to edit map" })
    }
}