import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/task.controller.js";

export const taskRoutes = Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.put("/:id", updateTaskStatus);
taskRoutes.delete("/:id", deleteTask);
