import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Nombre",
    placeholder: "Escribe aquí...",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "correo-invalido",
    error: "El formato no es correcto",
  },
};
