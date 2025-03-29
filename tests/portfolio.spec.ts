import { test, expect } from "@playwright/test";

test("добавление и удаление монеты Bitcoin из портфеля", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search for a coin...").fill("Bitcoin");

  const coinRow = page.locator("tr", { hasText: "Bitcoin BTC" });
  await expect(coinRow).toBeVisible();

  await coinRow.getByRole("button", { name: "Add" }).click();

  const modal = page.getByTestId("add-modal");
  await expect(modal).toBeVisible();

  const input = modal.getByPlaceholder("e.g. 0.001");
  await input.fill("0.5");

  await modal.getByRole("button", { name: /add to portfolio/i }).click();
  await expect(modal).toBeHidden();

  await page.getByTestId("portfolio-header").click();

  const portfolioModal = page.getByTestId("portfolio-modal");
  await expect(portfolioModal).toBeVisible();

  const firstRow = portfolioModal.locator("tbody tr", { hasText: "Bitcoin" }).first();
  await expect(firstRow).toBeVisible();

  await firstRow.getByRole("button", { name: /remove/i }).click();

  await expect(portfolioModal.locator("tbody tr", { hasText: "Bitcoin" })).toHaveCount(0);
});
