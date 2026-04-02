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
  permissions: [],
});
