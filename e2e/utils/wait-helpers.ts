import { Page, expect } from '@playwright/test';

/**
 * Wait for element to be visible with timeout
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForVisible(page: Page, selector: string, timeout = 5000) {
  await expect(page.locator(selector)).toBeVisible({ timeout });
}

/**
 * Wait for element to be hidden
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForHidden(page: Page, selector: string, timeout = 5000) {
  await expect(page.locator(selector)).toBeHidden({ timeout });
}

/**
 * Wait for element to be enabled
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForEnabled(page: Page, selector: string, timeout = 5000) {
  await expect(page.locator(selector)).toBeEnabled({ timeout });
}

/**
 * Wait for element to be disabled
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForDisabled(page: Page, selector: string, timeout = 5000) {
  await expect(page.locator(selector)).toBeDisabled({ timeout });
}

/**
 * Wait for element to be editable
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForEditable(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeEditable({ timeout });
}

/**
 * Wait for element to be read-only
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForReadOnly(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).not.toBeEditable({ timeout });
}

/**
 * Wait for element to be empty
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForEmpty(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeEmpty({ timeout });
}

/**
 * Wait for element to have text content
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param text Text to wait for
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForTextContent(page: Page, selector: string, text: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toHaveText(text, { timeout });
}

/**
 * Wait for element to have value
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param value Value to wait for
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForValue(page: Page, selector: string, value: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toHaveValue(value, { timeout });
}

/**
 * Wait for element to have count
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param count Expected count
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForCount(page: Page, selector: string, count: number, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toHaveCount(count, { timeout });
}

/**
 * Wait for element to be focused
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForFocused(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeFocused({ timeout });
}

/**
 * Wait for element to be not focused
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForNotFocused(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).not.toBeFocused({ timeout });
}

/**
 * Wait for element to be checked
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForChecked(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeChecked({ timeout });
}

/**
 * Wait for element to be not checked
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForNotChecked(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).not.toBeChecked({ timeout });
}

/**
 * Wait for element to be in viewport
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForInViewport(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeInViewport({ timeout });
}

/**
 * Wait for element to be out of viewport
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForOutOfViewport(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).not.toBeInViewport({ timeout });
}

/**
 * Wait for element to be attached
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForAttached(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeAttached({ timeout });
}

/**
 * Wait for element to be detached
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForDetached(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).not.toBeAttached({ timeout });
}

/**
 * Wait for element to have attribute
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param attribute Attribute name
 * @param value Expected value
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForAttribute(page: Page, selector: string, attribute: string, value: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toHaveAttribute(attribute, value, { timeout });
}

/**
 * Wait for element to have style
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param property CSS property
 * @param value Expected value
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForStyle(page: Page, selector: string, property: string, value: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toHaveCSS(property, value, { timeout });
}

/**
 * Wait for API response
 * @param page Playwright page instance
 * @param urlPattern URL pattern to match
 * @param timeout Timeout in milliseconds (default: 10000)
 */
export async function waitForApiResponse(page: Page, urlPattern: RegExp, timeout = 10000) {
  await page.waitForResponse(response => 
    response.url().match(urlPattern) && response.status() === 200, 
    { timeout }
  );
}

/**
 * Wait for element to have specific text
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param text Text to wait for
 * @param timeout Timeout in milliseconds (default: 5000)
 */
export async function waitForText(page: Page, selector: string, text: string, timeout = 5000) {
  await expect(page.locator(selector)).toContainText(text, { timeout });
}
