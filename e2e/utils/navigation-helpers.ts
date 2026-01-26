import { Page, expect } from '@playwright/test';

/**
 * Navigate to dashboard
 * @param page Playwright page instance
 */
export async function navigateToDashboard(page: Page) {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('The Core');
}

/**
 * Navigate to community page
 * @param page Playwright page instance
 */
export async function navigateToCommunity(page: Page) {
  await page.goto('/community');
  await expect(page.locator('h1')).toContainText('Community Hub');
}

/**
 * Navigate to messages page
 * @param page Playwright page instance
 */
export async function navigateToMessages(page: Page) {
  await page.goto('/messages');
  await expect(page.locator('h1')).toContainText('Comms Deck');
}

/**
 * Navigate to blog page
 * @param page Playwright page instance
 */
export async function navigateToBlog(page: Page) {
  await page.goto('/blog');
  await expect(page.locator('h1')).toContainText('Latest Insights');
}

/**
 * Navigate to profile page
 * @param page Playwright page instance
 */
export async function navigateToProfile(page: Page) {
  await page.goto('/profile');
  await expect(page.locator('h1')).toContainText('Modify Registry');
}

/**
 * Navigate to admin credits page
 * @param page Playwright page instance
 */
export async function navigateToAdminCredits(page: Page) {
  await page.goto('/admin/credits');
  await expect(page.locator('h1')).toContainText('Asset Control');
}

/**
 * Navigate to protected route
 * @param page Playwright page instance
 * @param route Route to navigate to
 */
export async function navigateToProtectedRoute(page: Page, route: string) {
  await page.goto(route);
  await page.waitForURL(/.*login/);
}

/**
 * Wait for navigation to complete
 * @param page Playwright page instance
 * @param urlPattern URL pattern to match
 */
export async function waitForNavigation(page: Page, urlPattern: RegExp) {
  await page.waitForURL(urlPattern);
}

/**
 * Wait for page to load completely
 * @param page Playwright page instance
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}
