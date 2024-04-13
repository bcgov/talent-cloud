import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 2000,
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ...process.env,
        CYPRESS_KEYCLOAK_URL: process.env.CYPRESS_AUTH_ORIGIN,
        CYPRESS_KEYCLOAK_USER: process.env.KEYCLOAK_USER,
        CYPRESS_KEYCLOAK_PASSWORD: process.env.KEYCLOAK_PASSWORD,
        baseUrl: process.env.CYPRESS_BASE_URL,
      };
      return config;
      // implement node event listeners here
    },
  },
});
