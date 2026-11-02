import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "../ui/Task";

vi.mock("../../../store/TaskStore");

describe("Task", () => {
  const mockDeleteTask = vi.fn();
  const mockToggleComplete = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();
    const { useTask } = await import("../../../store/TaskStore");
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      deleteTask: mockDeleteTask,
      toggleComplete: mockToggleComplete,
      deleteAllTasks: vi.fn(),
    });
  });

  it("должен рендериться с заголовком задачи", () => {
    render(<Task id={1} title="Тестовая задача" completed={false} />);
    expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
  });

  it("должен отображать checkbox", () => {
    render(<Task id={1} title="Задача" completed={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("должен отображать кнопку удаления", () => {
    render(<Task id={1} title="Задача" completed={false} />);
    const deleteButton = screen.getByRole("button", {
      name: /удалить задачу/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it("должен применять зачёркивание для выполненной задачи", () => {
    render(<Task id={1} title="Выполненная задача" completed={true} />);
    const taskTitle = screen.getByText("Выполненная задача");
    expect(taskTitle).toHaveClass("line-through", "text-gray-400");
  });

  it("не должен применять зачёркивание для активной задачи", () => {
    render(<Task id={1} title="Активная задача" completed={false} />);
    const taskTitle = screen.getByText("Активная задача");
    expect(taskTitle).toHaveClass("text-gray-800");
    expect(taskTitle).not.toHaveClass("line-through");
  });

  it("должен вызывать toggleComplete при клике на checkbox", async () => {
    const user = userEvent.setup();
    render(<Task id={1} title="Задача" completed={false} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockToggleComplete).toHaveBeenCalledWith(1);
    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
  });

  it("должен вызывать deleteTask при клике на кнопку удаления", async () => {
    const user = userEvent.setup();
    render(<Task id={1} title="Задача" completed={false} />);

    const deleteButton = screen.getByRole("button", {
      name: /удалить задачу/i,
    });
    await user.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
  });

  it("должен корректно работать с разными id", async () => {
    const user = userEvent.setup();
    render(<Task id={42} title="Задача 42" completed={false} />);

    await user.click(screen.getByRole("checkbox"));
    expect(mockToggleComplete).toHaveBeenCalledWith(42);

    await user.click(screen.getByRole("button", { name: /удалить задачу/i }));
    expect(mockDeleteTask).toHaveBeenCalledWith(42);
  });
});
