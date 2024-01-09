import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      viteConfig: customViteConfig,
    },
  },
});
