import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  component:{
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      viteConfig: customViteConfig,
    },
  }, 
  experimentalStudio: true,
  experimentalWebKitSupport: true,
});
