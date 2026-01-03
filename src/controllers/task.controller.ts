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

export const updateTask = async (req: Request, res: Response) => {
  const allowed: string[] = [
    "title",
    "description",
    "priority",
    "dueDate",
    "status",
  ];

  const updateBody: Record<string, any> = {};
  for (const key of allowed) {
    if ((req.body as any)[key] !== undefined)
      updateBody[key] = (req.body as any)[key];
  }

  // If dueDate is provided as a string, convert to Date
  if (updateBody.dueDate) {
    updateBody.dueDate = new Date(updateBody.dueDate);
  }

  const task = await Task.findByIdAndUpdate(req.params.id, updateBody, {
    new: true,
  });

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
