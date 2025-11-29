import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input Component", () => {
  it("should render with label", () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("should handle text change", () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Username"
        onChange={handleChange}
        placeholder="Enter name"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter name");

    // Simulamos escribir "Juan"
    fireEvent.change(inputElement, { target: { value: "Juan" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("should display error message when error prop is provided", () => {
    const errorMessage = "Formato inválido";
    render(<Input label="Email" error={errorMessage} />);

    // Verifica que el mensaje de error aparezca
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // Verifica que el input tenga la clase de error (borde rojo)
    // (Ajusta la clase según tu implementación de Tailwind, ej: border-red-500)
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.className).toContain("border-red-500");
  });
});
