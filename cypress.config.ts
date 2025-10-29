const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
  viewportWidth: 1280,
  viewportHeight: 720
});
