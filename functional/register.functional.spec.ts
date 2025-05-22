import { test, expect } from "@playwright/test";

test("debería redirigir a login al registrarse exitosamente", async ({
  page,
}) => {
  await page.route("**/api/register", async (route) => {
    await route.fulfill({
      status: 201,
      body: JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
    });
  });

  await page.goto("http://localhost:4200/register", {
    waitUntil: "networkidle",
  });
  await page.fill('input[name="email"]', "newfunctionaluser@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.fill('input[name="confirmPassword"]', "password123");

  await page.locator('input[name="confirmPassword"]').blur();
  await page.waitForTimeout(500);

  const registerButton = page.locator(
    'button[type="submit"]:has-text("Register")',
  );

  const buttonHTML = await registerButton.innerHTML();
  console.log(
    "[Playwright Functional Test - Éxito] HTML del botón Register ANTES de la aserción toBeEnabled:",
    buttonHTML,
  );
  const isDisabled = await registerButton.isDisabled();
  console.log(
    "[Playwright Functional Test - Éxito] Botón Register isDisabled ANTES de la aserción toBeEnabled:",
    isDisabled,
  );
  const isEnabled = await registerButton.isEnabled();
  console.log(
    "[Playwright Functional Test - Éxito] Botón Register isEnabled ANTES de la aserción toBeEnabled:",
    isEnabled,
  );

  await expect(registerButton).toBeEnabled({ timeout: 10000 });
  await registerButton.click();
  await expect(page).toHaveURL("http://localhost:4200/login");
});

test("debería mostrar mensaje de error si el email ya existe", async ({
  page,
}) => {
  await page.route("**/api/register", async (route) => {
    const requestBody = await route.request().postDataJSON();
    if (requestBody.email === "existingfunctional@example.com") {
      await route.fulfill({
        status: 409,
        body: JSON.stringify({ message: "Email already exists" }),
      });
    } else {
      await route.fulfill({
        status: 201,
        body: JSON.stringify({ success: true }),
      });
    }
  });

  await page.goto("http://localhost:4200/register", {
    waitUntil: "networkidle",
  });
  await page.fill('input[name="email"]', "existingfunctional@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.fill('input[name="confirmPassword"]', "password123");

  await page.locator('input[name="confirmPassword"]').blur();
  await page.waitForTimeout(500);

  const registerButton = page.locator(
    'button[type="submit"]:has-text("Register")',
  );

  const buttonHTMLFallido = await registerButton.innerHTML();
  console.log(
    "[Playwright Functional Test - Email Existente] HTML del botón Register ANTES de la aserción toBeEnabled:",
    buttonHTMLFallido,
  );
  const isDisabledFallido = await registerButton.isDisabled();
  console.log(
    "[Playwright Functional Test - Email Existente] Botón Register isDisabled ANTES de la aserción toBeEnabled:",
    isDisabledFallido,
  );
  const isEnabledFallido = await registerButton.isEnabled();
  console.log(
    "[Playwright Functional Test - Email Existente] Botón Register isEnabled ANTES de la aserción toBeEnabled:",
    isEnabledFallido,
  );

  await expect(registerButton).toBeEnabled({ timeout: 10000 });
  await registerButton.click();
  const errorMessage = page.locator("text=Email already exists");
  await expect(errorMessage).toBeVisible();
  await expect(page).toHaveURL("http://localhost:4200/register");
});

test("debería mostrar error de validación si las contraseñas no coinciden", async ({
  page,
}) => {
  await page.goto("http://localhost:4200/register", {
    waitUntil: "networkidle",
  });
  await page.fill('input[name="email"]', "testuser@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.fill('input[name="confirmPassword"]', "password456");

  await page.locator('input[name="confirmPassword"]').blur();

  const registerButton = page.locator(
    'button[type="submit"]:has-text("Register")',
  );
  await expect(registerButton).toBeDisabled();

  const passwordMismatchError = page.locator("text=Passwords do not match");
  await expect(passwordMismatchError).toBeVisible();
});
