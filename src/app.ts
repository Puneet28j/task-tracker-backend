// app.ts
import express from "express";
import cors from "cors";
import { taskRoutes } from "./routes/task.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/tasks", taskRoutes);
