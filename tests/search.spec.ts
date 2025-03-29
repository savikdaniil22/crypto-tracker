import { test, expect } from "@playwright/test";

test("поиск Bitcoin", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search for a coin...").fill("Bitcoin");

  await expect(page.getByText(/^BTC$/)).toBeVisible();
});

test("поиск MetaMorph", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search for a coin...").fill("MetaMorph");

  await expect(page.getByText(/^METM$/)).toBeVisible();
});
