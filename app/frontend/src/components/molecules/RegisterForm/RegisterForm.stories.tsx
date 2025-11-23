import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

const meta = {
  title: "Molecules/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Estado Inicial (Formulario vacío)
export const Default: Story = {
  args: {
    onSubmit: (data) =>
      alert(`Registro intentado con: ${JSON.stringify(data)}`),
    onGoToLogin: () => alert("Navegar al Login"),
  },
};

// 2. Estado Cargando (Botón deshabilitado y texto cambiante)
export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: () => {},
    onGoToLogin: () => {},
  },
};

// 3. Estado con Error (Muestra mensaje rojo)
export const WithError: Story = {
  args: {
    generalError: "El correo electrónico ya está en uso.",
    onSubmit: () => {},
    onGoToLogin: () => {},
  },
};
