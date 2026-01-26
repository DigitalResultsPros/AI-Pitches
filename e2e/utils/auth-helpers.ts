import { Page, expect } from '@playwright/test';

/**
 * Login helper function
 * @param page Playwright page instance
 * @param email User email
 * @param password User password
 */
export async function login(page: Page, email: string, password: string) {
  // Navigate to login page with longer timeout
  await page.goto('/login', { timeout: 30000 });
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Wait for email input to be visible
  const emailInput = page.locator('input[id="email"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  
  // Fill form
  await emailInput.fill(email);
  await page.fill('input[id="password"]', password);
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL(/.*dashboard/, { timeout: 15000 });
}

/**
 * Logout helper function
 * @param page Playwright page instance
 */
export async function logout(page: Page) {
  // Click logout button (assuming it exists in navbar)
  // Use first() to handle multiple elements with the same selector
  const logoutButton = page.locator('a[href="/login"]').first();
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  } else {
    // Alternative: navigate directly to login
    await page.goto('/login');
  }
  await page.waitForURL(/.*login/, { timeout: 10000 });
}

/**
 * Create a test user for testing
 * @param page Playwright page instance
 * @param email User email
 * @param password User password
 */
export async function createTestUser(page: Page, email: string, password: string) {
  await page.goto('/register?role=founder');
  
  // Handle alert dialog
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  
  await page.fill('input[id="email"]', email);
  await page.fill('input[id="password"]', password);
  await page.fill('input[id="confirm"]', password);
  await page.click('button[type="submit"]');
  
  // Verify redirect to login page after alert is accepted
  await expect(page).toHaveURL(/.*login/);
}

/**
 * Check if user is authenticated
 * @param page Playwright page instance
 * @returns True if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const currentUrl = page.url();
  return !currentUrl.includes('/login') && !currentUrl.includes('/register');
}
