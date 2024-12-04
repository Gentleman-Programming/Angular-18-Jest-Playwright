import { test, expect } from '@playwright/test';

test('flujo completo de login exitoso', async ({ page }) => {
  // mockear la API de login para un caso exitoso
  await page.route('**/api/login', async (route) => {
    const requestBody = await route.request().postDataJSON();
    if (requestBody.email === 'user@example.com' && requestBody.password === 'password123') {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    } else {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    }
  });

  // iniciar sesión
  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // verificar redirección
  await expect(page).toHaveURL('http://localhost:4200/dashboard');
});

test('flujo completo de login fallido', async ({ page }) => {
  // mockear la API de login para un caso fallido
  await page.route('**/api/login', async (route) => {
    const requestBody = await route.request().postDataJSON();
    if (requestBody.email === 'user@example.com' && requestBody.password === 'wrongpassword') {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    } else {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    }
  });

  // iniciar sesión con credenciales incorrectas
  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');

  // verificar mensaje de error
  const errorMessage = page.locator('text=Invalid credentials');
  await expect(errorMessage).toBeVisible();
});
