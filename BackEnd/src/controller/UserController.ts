import * as userService from "../service/UserService"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../type/User";

const jwtKey: string = String(process.env.JWT_SECRET);
const jwtRefreshKey: string = String(process.env.JWT_REFRESH_SECRET)
export async function createUser(req: Request, res: Response) {
  try {
    const obj: UserInterface = {
      name: req.body.name,
      password: req.body.password,
      admin: req.body.admin
    };
    const rep = await userService.createUser(obj);
    if (!rep) return res.status(404).json({ error: "User creation failed" });

    res.json(rep);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const success = await userService.deleteUser(Number(req.params.id));
    if (!success) return res.status(404).json({ error: "Remove user failed" });
    res.status(204).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
}

export async function findUserByName(req: Request, res: Response) {
  try {
    const rep = await userService.findUserByName(req.params.name);
    if (!rep) return res.status(404).json({ error: "User not found " });
    res.json(rep);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try{const [users] = await userService.getAllUsers();
  res.json(users);}
  catch (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to fetch user" });
    }
}

export async function checkUser(req: Request, res: Response) {
  const { password, username } = req.body;
  const user = await userService.checkUser(username, password);
  if (!user) {
    return res.status(401).json({ erro: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ id: user.id }, jwtKey, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, jwtRefreshKey, { expiresIn: "7d" });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // ⚠️ mettre true en production (https)
    sameSite: "strict",
  });
  res.json(accessToken);
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, jwtRefreshKey);
    const newAccessToken = jwt.sign({ id: (payload as any).id }, jwtKey, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken })
  } catch {
    res.sendStatus(403);
  }
}
