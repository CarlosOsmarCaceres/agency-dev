import type { Preview } from "@storybook/react";

// 👇👇 ESTA LÍNEA ES OBLIGATORIA. ASEGÚRATE DE QUE ESTÉ AHÍ 👇👇
import '../src/index.css'; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;