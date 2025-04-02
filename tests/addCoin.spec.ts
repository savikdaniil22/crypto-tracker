import { test, expect } from "@playwright/test";

test("валидация min и max значений при добавлении монеты", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("search-input").fill("Birds");
  const coinRow = page.locator("tr", { hasText: "Birds BIRDS" });
  await expect(coinRow).toBeVisible();

  await coinRow.getByTestId("add-button").click();

  const modal = page.getByTestId("add-modal");
  await expect(modal).toBeVisible();

  const input = modal.getByPlaceholder("e.g. 0.001");

  await input.fill("0");
  await expect(modal.getByText("Minimum amount is 0.0001")).toBeVisible();

  await input.fill("100000000");
  await expect(modal.getByText("Maximum amount is 1000000")).toBeVisible();

  await input.fill("100");

  await modal.getByRole("button", { name: /add to portfolio/i }).click();

  await expect(modal).toBeHidden();

  await expect(page.getByTestId("portfolio-header")).toBeVisible();

  await expect(page.getByTestId("empty-portfolio")).toHaveCount(0);
});
