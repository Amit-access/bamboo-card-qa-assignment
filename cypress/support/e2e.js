// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific TypeErrors
    if (
      err.message.includes('AddFotoramaVideoEvents is not a function') ||
      err.message.includes('Cannot convert undefined or null to object') ||
      err.message.includes('Magento_Ui/js/lib/core/class')
    ) {
      return false; // Prevent test failure
    }
  });