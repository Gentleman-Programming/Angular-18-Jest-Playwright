import { test, expect } from '@playwright/test';

test('debería redirigir al dashboard al loguearse', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({ status: 200 });
  });

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
});

test('debería mostrar mensaje de error en login fallido', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({
      status: 401,
      body: JSON.stringify({ message: 'Invalid credentials' })
    });
  });

  await page.goto('http://localhost:4200/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');

  const errorMessage = page.locator('text=Invalid credentials');
  await expect(errorMessage).toBeVisible();
});
