const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    setupNodeEvents(on, config) {
      // Add Mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);

      //Inject .env variables into cypress config
      config.env.BAMBOO_API_KEY = process.env.BAMBOO_API_KEY;
      config.env.BAMBOO_USERNAME = process.env.BAMBOO_USERNAME;
      config.env.BAMBOO_PASSWORD = process.env.BAMBOO_PASSWORD;
      config.env.NEW_USER_EMAIL = process.env.NEW_USER_EMAIL;
      config.env.NEW_USER_PASSWORD = process.env.NEW_USER_PASSWORD;

      return config;
    },
    reporter: "cypress-mochawesome-reporter", // Set Mochawesome as the reporter
    reporterOptions: {
      reportDir: "cypress/reports", // Directory for reports
      overwrite: false,
      html: true,
      json: true,
    },
    env: {
      // Add any environment variables if needed
    },
  },
});
