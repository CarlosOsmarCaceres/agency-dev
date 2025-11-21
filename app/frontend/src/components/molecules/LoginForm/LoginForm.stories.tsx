import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta = {
  title: "Molecules/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light", // Para ver bien la sombra blanca
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Estado Inicial
export const Default: Story = {
  args: {
    onSubmit: (data) => alert(`Login intentado con: ${JSON.stringify(data)}`),
  },
};

// 2. Estado Cargando (Simula espera de API)
export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: () => {},
  },
};

// 3. Estado con Error (Simula credenciales incorrectas)
export const WithError: Story = {
  args: {
    generalError: "El correo o la contraseña son incorrectos.",
    onSubmit: () => {},
  },
};
