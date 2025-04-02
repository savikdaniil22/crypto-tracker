import { test, expect } from "@playwright/test";

test("поиск Bitcoin", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("search-input").fill("Bitcoin");

  await expect(page.getByText(/^BTC$/)).toBeVisible();
});

test("поиск MetaMorph", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("search-input").fill("MetaMorph");

  await expect(page.getByText(/^METM$/)).toBeVisible();
});
