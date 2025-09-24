import express from "express";
import mapObjectRouter from "./router/MapObjectRouter";
import mapRouter from "./router/MapRouter"
import userRouter from "./router/UserRouter"
import cors from "cors";
import pool from "./db";

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

const PORT = process.env.BACKEND_PORT || 3000;
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_LINK, // ton frontend
  credentials: true                // si tu utilises cookies / sessions
}));
app.use(express.json());

app.use("/api/mapObject", mapObjectRouter);
app.use("/api/map", mapRouter);
app.use("/api/user",userRouter)

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});