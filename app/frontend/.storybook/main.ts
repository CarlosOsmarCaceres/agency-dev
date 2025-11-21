import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // 👇 AQUÍ ESTÁ LA CLAVE:
  // Le decimos que busque en CUALQUIER subcarpeta (**) dentro de src
  stories: [
    "../src/**/*.mdx", 
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-chromatic",
    "@storybook/addon-interactions",
  ],
  
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;