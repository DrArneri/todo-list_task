import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../ui/Button";

describe("Button", () => {
  it("должен рендериться с текстом кнопки", () => {
    render(<Button buttonText="Нажми меня" />);
    expect(screen.getByText("Нажми меня")).toBeInTheDocument();
  });

  it("должен рендериться с дочерними элементами", () => {
    render(
      <Button>
        <span>Иконка</span>
      </Button>,
    );
    expect(screen.getByText("Иконка")).toBeInTheDocument();
  });

  it("должен вызывать onClick при клике", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button buttonText="Кликни" onClick={handleClick} />);

    await user.click(screen.getByText("Кликни"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("должен применять кастомный className", () => {
    render(<Button buttonText="Тест" className="custom-class" />);
    const button = screen.getByText("Тест");
    expect(button).toHaveClass("custom-class");
  });

  it("должен быть disabled когда передан атрибут", () => {
    render(<Button buttonText="Disabled" disabled />);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("не должен вызывать onClick когда disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button buttonText="Disabled" onClick={handleClick} disabled />);

    await user.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("должен применять variant из buttonVariants", () => {
    render(<Button buttonText="Add" variant="addButton" />);
    const button = screen.getByText("Add");
    expect(button).toBeInTheDocument();
  });
});
