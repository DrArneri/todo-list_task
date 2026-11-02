import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../ui/App";

describe("App", () => {
  it("должен рендериться без ошибок", () => {
    render(<App />);
    expect(screen.getByText("To Do List")).toBeInTheDocument();
  });

  it("должен отображать заголовок приложения", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /to do list/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-bold");
  });

  it("должен содержать AddTaskBar", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("New task title")).toBeInTheDocument();
  });

  it("должен содержать SearchTaskBar", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search Task")).toBeInTheDocument();
  });

  it("должен содержать TaskList с заголовком", () => {
    render(<App />);
    expect(screen.getByText(/Total Tasks:/i)).toBeInTheDocument();
  });

  it("должен иметь правильную структуру layout", () => {
    const { container } = render(<App />);

    const mainWrapper = container.querySelector(".bg-gray-300");
    expect(mainWrapper).toBeInTheDocument();

    const contentBox = container.querySelector(".bg-white.rounded-xl");
    expect(contentBox).toBeInTheDocument();
  });

  it("все основные компоненты должны быть видимы", () => {
    render(<App />);

    expect(screen.getByText("To Do List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New task title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search Task")).toBeInTheDocument();
    expect(screen.getByText(/Total Tasks:/i)).toBeInTheDocument();
    expect(screen.getByText("Delete All")).toBeInTheDocument();
  });
});
