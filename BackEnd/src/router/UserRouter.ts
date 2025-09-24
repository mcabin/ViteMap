import { Router } from "express";
import * as userController from "../controller/UserController"

const router=Router();

router.get("/login",userController.checkUser);
router.get("/name/:name",userController.findUserByName);
router.delete("/:id",userController.deleteUser);
router.post("/",userController.createUser)
router.get("/",userController.getAllUsers);
router.post("/refresh",userController.refresh)
export default router;