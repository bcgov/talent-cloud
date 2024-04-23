import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // vite config
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  assetsInclude: ['public/**/*'],
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@material-tailwind/react',
      'axios',
      '@headlessui/react',
      '@material-tailwind/react',
      '@react-keycloak/web',
      '@tailwindcss/forms',
      'autoprefixer',
      'axios',
      'date-fns',
      'dayjs',
      'formik',
      'react',
      'react-day-picker',
      'react-dom',
      'react-router',
      'react-router-dom',
      'uuid',
      'yup',
    ],
  },
  base: './',
  server: {
    port: parseInt(process.env.PORT ?? '3000'),
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: process.env.BACKEND_URL,
        changeOrigin: true,
      },
      '/docs': {
        target: `${process.env.BACKEND_URL}/docs`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    // https://vitejs.dev/config/shared-options.html#resolve-alias
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.cjs'],
  },
  build: {
    manifest: true,
    assetsDir: 'static',
    // Build Target
    // https://vitejs.dev/config/build-options.html#build-target
    target: 'esnext',
    // Minify option
    // https://vitejs.dev/config/build-options.html#build-minify
    minify: 'esbuild',
    // Rollup Options
    // https://vitejs.dev/config/build-options.html#build-rollupoptions
    rollupOptions: {
      output: {
        manualChunks: {
          // Split external library from transpiled code.
          '@headlessui/react': ['@headlessui/react'],

          '@material-tailwind/react': ['@material-tailwind/react'],
          '@react-keycloak/web': ['@react-keycloak/web'],

          autoprefixer: ['autoprefixer'],
          'date-fns': ['date-fns'],
          dayjs: ['dayjs'],
          formik: ['formik'],

          'react-day-picker': ['react-day-picker'],

          uuid: ['uuid'],
          yup: ['yup'],
          react: ['react', 'react-dom', 'react-router-dom', 'react-router'],
          axios: ['axios'],
        },
      },
    },
  },
});
