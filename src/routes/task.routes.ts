import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

export const taskRoutes = Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
