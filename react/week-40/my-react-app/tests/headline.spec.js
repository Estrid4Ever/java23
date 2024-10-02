import { test, expect } from '@playwright/test';

test('should display the correct headline', async ({ page }) => {
  await page.goto('http://localhost:5174/');

  // Check if the headline is present and has the correct text
  const headline = await page.locator('h1');
  await expect(headline).toHaveText('Elektriker Jansson');
});

test('should take you to leave review', async ({ page }) => {
  await page.goto('http://localhost:5174/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Lämna omdöme' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Tyck till!' })).toBeVisible();
});