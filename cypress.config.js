const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");
const fs = require("fs");
const path = require("path");

function setupNodeEvents(on, config) {
  mochawesome(on);

  on("after:run", (results) => {
    const reportDir = path.join(__dirname, "reports", "logs");
    fs.mkdirSync(reportDir, { recursive: true });

    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: results.totalTests,
      passed: results.passed,
      failed: results.failed,
      pending: results.pending || 0,
      duration: results.totalDuration || 0,
      browserName: results.browserName || "electron",
      status: results.failures > 0 ? "failed" : "passed",
    };

    const fileName = `cypress-run-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    fs.writeFileSync(path.join(reportDir, fileName), JSON.stringify(summary, null, 2));
  });

  return config;
}

module.exports = defineConfig({
  allowCypressEnv: false,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "https://automationpratice.com.br",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
});
