import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
// Importamos el archivo de setup para asegurarnos de que los tipos de jest-dom estén disponibles
import "../../../../vitest.setup";

describe("Button Component", () => {
  // 1. Test de Renderizado
  it("should render with the correct label", () => {
    render(<Button label="Click me" />);

    // Busca un elemento que tenga el texto "Click me"
    const buttonElement = screen.getByText("Click me");

    // Verifica que esté en el documento
    expect(buttonElement).toBeInTheDocument();
  });

  // 2. Test de Interacción
  it("should call onClick when clicked", () => {
    const handleClick = vi.fn(); // Función espía (Mock)
    render(<Button label="Click me" onClick={handleClick} />);

    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);

    // Verifica que la función se haya llamado una vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 3. Test de Estilos (Tailwind)
  it("should apply primary styles when primary prop is true", () => {
    render(<Button label="Primary" primary />);
    const buttonElement = screen.getByText("Primary");

    // Verificamos si tiene la clase de fondo de tu color primario
    // (Asegúrate de que coincida con lo que tienes en Button.tsx)
    expect(buttonElement.className).toContain("bg-[#1ea7fd]");
  });
});
