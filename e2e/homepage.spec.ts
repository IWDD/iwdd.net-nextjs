import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test('should return HTTP 200 and display key content', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    // IWDD Logo
    await expect(page.getByAltText('IWDD Logo')).toBeVisible()

    // 主要コンテンツ
    await expect(page.getByText('会場')).toBeVisible()
    await expect(page.getByText('開催日')).toBeVisible()
    await expect(page.getByText('参加費')).toBeVisible()
    await expect(page.getByText('社会人')).toBeVisible()
    await expect(page.getByText('学生')).toBeVisible()
    await expect(page.getByText('今月のお題')).toBeVisible()
    await expect(page.getByText('参加申し込み')).toBeVisible()
  })
})
