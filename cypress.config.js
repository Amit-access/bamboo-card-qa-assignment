const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com',
    setupNodeEvents(on, config) {
      // Add Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter', // Set Mochawesome as the reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory for reports
      overwrite: false,
      html: true,
      json: true
    },
    env: {
      // Add any environment variables if needed
    }
  },
});