import { Router } from "express";
import * as mapController from "../controller/MapController"

const router=Router();

router.get("/",mapController.getAllMaps);
router.get("/:id",mapController.getMapById);
router.get("/fName/:findName",mapController.findMapByPartialName);
router.get("/name/:name",mapController.getMapByName);
router.delete("/:id",mapController.deleteMapById);
router.post("/",mapController.createMap)

export default router;