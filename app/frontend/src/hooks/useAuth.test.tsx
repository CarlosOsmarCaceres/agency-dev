import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "./useAuth";
import * as authAdapter from "../adapters/auth.adapter";

// 1. Mockeamos el adaptador y el router
vi.mock("../adapters/auth.adapter");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useAuth Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should login successfully", async () => {
    // Configurar el mock para que devuelva un token falso
    vi.spyOn(authAdapter, "loginRequest").mockResolvedValue("fake-jwt-token");

    const { result } = renderHook(() => useAuth());

    // Ejecutar la acción (dentro de act porque actualiza estado)
    await act(async () => {
      await result.current.login("test@test.com", "123456");
    });

    // Verificaciones
    expect(localStorage.getItem("token")).toBe("fake-jwt-token"); // ¿Guardó el token?
    expect(mockNavigate).toHaveBeenCalledWith("/catalog"); // ¿Redirigió?
    expect(result.current.error).toBe("");
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle login error", async () => {
    // Configurar el mock para que falle
    vi.spyOn(authAdapter, "loginRequest").mockRejectedValue(
      new Error("Credenciales inválidas")
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("bad@test.com", "wrong");
    });

    expect(localStorage.getItem("token")).toBeNull(); // No debe haber token
    expect(result.current.error).toBe("Credenciales inválidas"); // Debe tener el mensaje de error
  });

  it("should logout correctly", () => {
    // Preparamos el escenario con un token
    localStorage.setItem("token", "old-token");

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem("token")).toBeNull(); // Debe borrarlo
    expect(mockNavigate).toHaveBeenCalledWith("/login"); // Debe mandar al login
  });
});
