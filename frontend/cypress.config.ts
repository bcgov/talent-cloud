import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    //TODO add this back
    // baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
