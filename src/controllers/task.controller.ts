import { Request, Response } from "express";
import { Task } from "../models/task.model.js";

export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const priority = req.query.priority as string | undefined;
  const sort = (req.query.sort as string | undefined) || "asc";

  const filter: Record<string, any> = {};
  if (status && status !== "All") filter.status = status;
  if (priority && priority !== "All") filter.priority = priority;

  const sortOrder = sort === "desc" ? -1 : 1;

  const tasks = await Task.find(filter).sort({ dueDate: sortOrder });
  res.json(tasks);
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
