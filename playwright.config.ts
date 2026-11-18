import { defineConfig, devices } from "@playwright/test";

/**
 * Recette de bout en bout sur le build de production local (`next start`).
 * CHROME_PATH permet d'utiliser un Chrome déjà installé (CI sans téléchargement).
 */
const port = Number(process.env.PORT ?? 3100);
const baseURL = `http://127.0.0.1:${port}`;
const executablePath = process.env.CHROME_PATH;
const launchOptions = executablePath ? { executablePath } : {};

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    launchOptions,
  },
  projects: [
    { name: "mobile-320", use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, launchOptions } },
    { name: "mobile-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, launchOptions } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, hasTouch: true, launchOptions } },
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions } },
  ],
  webServer: {
    command: `npx next start -p ${port}`,
    url: `${baseURL}/fr`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
