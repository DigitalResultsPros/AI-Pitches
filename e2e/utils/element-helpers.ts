import { Page, expect } from '@playwright/test';

/**
 * Fill form helper
 * @param page Playwright page instance
 * @param formData Object with field names and values
 */
export async function fillForm(page: Page, formData: Record<string, string>) {
  for (const [name, value] of Object.entries(formData)) {
    await page.fill(`input[name="${name}"]`, value);
  }
}

/**
 * Click button by text
 * @param page Playwright page instance
 * @param text Button text
 */
export async function clickButtonByText(page: Page, text: string) {
  await page.click(`button:has-text("${text}")`);
}

/**
 * Get element text content
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns Text content of the element
 */
export async function getTextContent(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  return await element.textContent() || '';
}

/**
 * Check if element exists
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns True if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return await element.count() > 0;
}

/**
 * Take screenshot of current page
 * @param page Playwright page instance
 * @param name Screenshot name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/screenshots/${name}.png` });
}

/**
 * Clear all inputs in a form
 * @param page Playwright page instance
 * @param formSelector CSS selector for the form
 */
export async function clearForm(page: Page, formSelector: string) {
  const inputs = page.locator(`${formSelector} input`);
  const count = await inputs.count();
  for (let i = 0; i < count; i++) {
    await inputs.nth(i).fill('');
  }
}

/**
 * Get input value
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns Input value
 */
export async function getInputValue(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  return await element.inputValue() || '';
}

/**
 * Check if checkbox is checked
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns True if checkbox is checked
 */
export async function isCheckboxChecked(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return await element.isChecked();
}

/**
 * Check if radio button is selected
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns True if radio button is selected
 */
export async function isRadioSelected(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return await element.isChecked();
}

/**
 * Select dropdown option
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param value Option value
 */
export async function selectDropdownOption(page: Page, selector: string, value: string) {
  await page.selectOption(selector, value);
}

/**
 * Get dropdown selected value
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns Selected value
 */
export async function getDropdownSelectedValue(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  return await element.inputValue() || '';
}

/**
 * Check if element has specific class
 * @param page Playwright page instance
 * @param selector CSS selector
 * @param className Class name to check
 * @returns True if element has the class
 */
export async function hasClass(page: Page, selector: string, className: string): Promise<boolean> {
  const element = page.locator(selector);
  const classes = await element.getAttribute('class');
  return classes?.includes(className) || false;
}

/**
 * Click element if visible
 * @param page Playwright page instance
 * @param selector CSS selector
 */
export async function clickIfVisible(page: Page, selector: string) {
  const element = page.locator(selector);
  if (await element.isVisible()) {
    await element.click();
  }
}

/**
 * Get element count
 * @param page Playwright page instance
 * @param selector CSS selector
 * @returns Number of elements
 */
export async function getElementCount(page: Page, selector: string): Promise<number> {
  return await page.locator(selector).count();
}
