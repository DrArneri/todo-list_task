import { describe, it, expect, beforeEach } from "vitest";
import { useTask } from "./TaskStore";
import type { Task } from "../entity/Task/model/model";

describe("TaskStore", () => {
  beforeEach(() => {
    const store = useTask.getState();
    store.tasks = [];
  });

  it("должен инициализироваться с пустым списком задач", () => {
    const { tasks } = useTask.getState();
    expect(tasks).toEqual([]);
  });

  it("должен добавлять новую задачу", () => {
    const newTask: Task = {
      id: 1,
      title: "Тестовая задача",
      isDone: false,
    };

    useTask.getState().addTask(newTask);

    const { tasks } = useTask.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(newTask);
  });

  it("должен добавлять несколько задач", () => {
    const task1: Task = { id: 1, title: "Задача 1", isDone: false };
    const task2: Task = { id: 2, title: "Задача 2", isDone: false };

    useTask.getState().addTask(task1);
    useTask.getState().addTask(task2);

    const { tasks } = useTask.getState();
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(task1);
    expect(tasks[1]).toEqual(task2);
  });

  it("должен удалять задачу по id", () => {
    const task1: Task = { id: 1, title: "Задача 1", isDone: false };
    const task2: Task = { id: 2, title: "Задача 2", isDone: false };

    useTask.getState().addTask(task1);
    useTask.getState().addTask(task2);
    useTask.getState().deleteTask(1);

    const { tasks } = useTask.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe(2);
  });

  it("не должен изменять список при удалении несуществующей задачи", () => {
    const task: Task = { id: 1, title: "Задача", isDone: false };

    useTask.getState().addTask(task);
    useTask.getState().deleteTask(999);

    const { tasks } = useTask.getState();
    expect(tasks).toHaveLength(1);
  });
});
