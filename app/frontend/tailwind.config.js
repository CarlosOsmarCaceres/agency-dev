/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // 👇 AQUÍ DEFINIMOS TUS COLORES PERSONALIZADOS
            colors: {
                primary: '#1ea7fd', // Mantenemos el azul original por si acaso
                evo: {
                    dark: '#0a051e',       // Fondo principal (Violeta muy oscuro)
                    bg: '#101728',      // Fondo alternativo (Azul muy oscuro)
                    deep: '#1a0f2e',       // Fondo secundario
                    purple: '#9c27b0',     // Violeta Neón
                    lightPurple: '#ba68c8',// Violeta Claro
                    green: '#4caf50',      // Verde
                    lime: '#9ff818',       // Verde Lima ácido
                }
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
            // Animaciones para el efecto Glitch y Scan
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}