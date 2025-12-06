import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm Component", () => {
  it("should render email and password inputs", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    // Verificamos que el botón exista
    expect(
      screen.getByRole("button", { name: /ingresar/i })
    ).toBeInTheDocument();
  });

  // 👇 NUEVO TEST: Verificar la lógica de mostrar/ocultar password
  it("should toggle password visibility", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const passwordInput = screen.getByLabelText(/contraseña/i);
    // Buscamos el botón por su aria-label (accesibilidad)
    const toggleBtn = screen.getByLabelText(/mostrar contraseña/i);

    // 1. Por defecto debe ser password (oculto)
    expect(passwordInput).toHaveAttribute("type", "password");

    // 2. Click en el ojo
    fireEvent.click(toggleBtn);

    // 3. Ahora debe ser texto visible
    expect(passwordInput).toHaveAttribute("type", "text");

    // 4. Click de nuevo
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should submit form with correct values", () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "neo@matrix.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "trinity123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: "neo@matrix.com",
      password: "trinity123",
    });
  });
});
