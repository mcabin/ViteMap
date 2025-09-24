import { Router } from "express";
import * as mapObjectController from "../controller/MapObjectController"

const router=Router();

router.get("/map/:id_map",mapObjectController.getMapObjectByMapId);
router.get("/:id",mapObjectController.getMapObjectById);
router.get("/fName/:findName",mapObjectController.findMapObjectByPartialName);
router.get("/name/:name",mapObjectController.getMapObjectByName);
router.delete("/:id",mapObjectController.deleteMapObjectById);
router.post("/",mapObjectController.createMapObject)

export default router;