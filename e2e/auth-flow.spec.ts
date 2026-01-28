import { test, expect } from '@playwright/test';
import { login, logout } from './utils/auth-helpers';
import { navigateToDashboard, navigateToCommunity, navigateToMessages, navigateToBlog, navigateToProfile, navigateToAdminCredits } from './utils/navigation-helpers';
import { waitForVisible, waitForText } from './utils/wait-helpers';

test.describe('Authentication Flow', () => {
  test('User can login successfully', async ({ page }) => {
    // First register a user
    const testEmail = `test-${Date.now()}@example.com`;
    await page.goto('/register?role=founder');
    
    // Handle alert dialog
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    
    // Fill registration form
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirm"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to login page after alert is accepted
    await expect(page).toHaveURL(/.*login/);
    
    // Now login with the registered user
    await login(page, testEmail, 'password123');
    
    // Verify dashboard loads
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('The Core');
  });

  test('User can register with founder role', async ({ page }) => {
    await page.goto('/register?role=founder');
    
    // Verify registration form - use more specific selector
    await expect(page.locator('h2:has-text("Join as a Founder")')).toBeVisible();
    
    // Handle alert dialog
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    
    // Fill registration form
    await page.fill('input[id="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirm"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to login page after alert is accepted
    await expect(page).toHaveURL(/.*login/);
  });

  test('User can register with funder role', async ({ page }) => {
    await page.goto('/register?role=funder');
    
    // Verify registration form - use more specific selector
    await expect(page.locator('h2:has-text("Join as a Funder")')).toBeVisible();
    
    // Handle alert dialog
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    
    // Fill registration form
    await page.fill('input[id="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirm"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to login page after alert is accepted
    await expect(page).toHaveURL(/.*login/);
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');
    
    // Fill with invalid credentials
    await page.fill('input[id="email"]', 'invalid@example.com');
    await page.fill('input[id="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('text=Invalid login credentials')).toBeVisible();
  });

  test('Password mismatch shows error during registration', async ({ page }) => {
    await page.goto('/register?role=founder');
    
    // Fill with mismatched passwords
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirm"]', 'differentpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('User can logout', async ({ page }) => {
    // First register a user
    const testEmail = `test-${Date.now()}@example.com`;
    await page.goto('/register?role=founder');
    
    // Handle alert dialog
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    
    // Fill registration form
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirm"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to login page after alert is accepted
    await expect(page).toHaveURL(/.*login/);
    
    // Now login with the registered user
    await login(page, testEmail, 'password123');
    
    // Navigate to dashboard
    await page.goto('/dashboard');
    
    // Logout
    await logout(page);
    
    // Verify redirected to login
    await expect(page).toHaveURL(/.*login/);
  });

  test('Protected routes redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });

  test('Landing page has version toggle', async ({ page }) => {
    await page.goto('/');
    
    // Verify version toggle button - starts with "Switch to V1" (from futuristic to classic)
    const toggleButton = page.locator('button:has-text("Switch to V1")');
    await expect(toggleButton).toBeVisible();
    
    // Click toggle
    await toggleButton.click();
    
    // After clicking, button should show "Switch to V2" (from classic to futuristic)
    await expect(page.locator('button:has-text("Switch to V2")')).toBeVisible();
  });

  test('Landing page has feature sections', async ({ page }) => {
    await page.goto('/');
    
    // Verify feature sections - Futuristic version has different features
    // Check for Futuristic features (default version)
    await expect(page.locator('h3:has-text("Hyper-Velocity")')).toBeVisible();
    await expect(page.locator('h3:has-text("Neural Synergy")')).toBeVisible();
    await expect(page.locator('h3:has-text("Apex Prestige")')).toBeVisible();
  });

  test('Blog page loads posts', async ({ page }) => {
    await page.goto('/blog');
    
    // Verify blog page loads
    await expect(page.locator('h1')).toContainText('Latest Insights');
  });

  test('Blog post detail page loads', async ({ page }) => {
    // Create a test post first (if needed)
    await page.goto('/blog');
    
    // Click on first post if exists
    const firstPost = page.locator('a[href^="/blog/"]').first();
    if (await firstPost.isVisible()) {
      await firstPost.click();
      
      // Verify post detail page
      await expect(page.locator('article')).toBeVisible();
    }
  });
});
