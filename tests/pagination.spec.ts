import { test, expect } from "@playwright/test";

test("работа пагинации: 3 страницы вперёд, 3 страницы назад", async ({ page }) => {
  await page.goto("/");

  const getFirstRowText = () => page.locator("tbody tr").first().innerText();

  const page1Coin = await getFirstRowText();

  const next = page.getByTestId("pagination-next");
  const prev = page.getByTestId("pagination-prev");

  await next.click();
  await page.waitForTimeout(300);
  await next.click();
  await page.waitForTimeout(300);
  await next.click();
  await page.waitForTimeout(300);

  const page4Coin = await getFirstRowText();
  expect(page4Coin).not.toBe(page1Coin);

  await prev.click();
  await page.waitForTimeout(300);
  await prev.click();
  await page.waitForTimeout(300);
  await prev.click();
  await page.waitForTimeout(300);

  const finalCoin = await getFirstRowText();

  expect(finalCoin).toBe(page1Coin);
});
