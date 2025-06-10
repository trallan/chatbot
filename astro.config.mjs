import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    integrations: [react()],
    base: '/chatbot/',
    vite: {
        plugins: [tailwindcss()],
    },
});
