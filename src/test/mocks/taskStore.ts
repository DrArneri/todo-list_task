import { vi } from "vitest";
import type { TaskStore } from "../../store/TaskStore";

export const createMockTaskStore = (
  overrides?: Partial<TaskStore>,
): TaskStore => ({
  tasks: [],
  addTask: vi.fn(),
  deleteTask: vi.fn(),
  toggleComplete: vi.fn(),
  deleteAllTasks: vi.fn(),
  ...overrides,
});
