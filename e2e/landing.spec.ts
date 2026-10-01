import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/MindDock/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get started' }).nth(1).click();
  await expect(page).toHaveURL(/registration/);
});
test('sign in link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sign in' }).nth(1).click();
  await expect(page).toHaveURL(/login/);
});
