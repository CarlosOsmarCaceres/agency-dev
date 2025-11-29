import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm Component", () => {
  it("should render email and password inputs", () => {
    // Mock de la función onSubmit (no hace nada, solo espía)
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    // Verificamos que existan los inputs por su etiqueta (Label)
    // Esto es mejor práctica que buscar por ID o Clase
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ingresar/i })
    ).toBeInTheDocument();
  });

  it("should call onSubmit with form data when submitted", () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // 1. Buscamos los elementos
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    // 2. Simulamos que el usuario escribe
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // 3. Simulamos el click en enviar
    fireEvent.click(submitButton);

    // 4. Verificamos que la función se llamó con los datos correctos
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("should display general error message when provided", () => {
    render(
      <LoginForm onSubmit={vi.fn()} generalError="Credenciales inválidas" />
    );

    // Verificamos que el mensaje de error aparezca en pantalla
    expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
  });
});
