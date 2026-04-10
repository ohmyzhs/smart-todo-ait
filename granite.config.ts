import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'smart-todo',
  web: {
    port: 5173,
    commands: {
      dev: 'vite --host',
      build: 'vite build',
    },
  },
  brand: {
    displayName: '주간 플래너',
    primaryColor: '#3182F6',
    icon: './app-icon.png',
  },
  permissions: [],
});
