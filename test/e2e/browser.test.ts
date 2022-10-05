/* global page */
import { getRenderResult, wait } from '../utils/puppeteer'

const BROWSER_TEST_URL = 'http://localhost:3000/browser'

const VIEWPORT_PC = {
  width: 1200,
  height: 630,
}

const VIEWPORT_SP = {
  width: 375,
  height: 630,
}

const TEXT_PC = 'PC'
const TEXT_SP = 'SP'

describe('browser', () => {
  test('Resize: PC -> SP -> PC', async () => {
    // PC viewport
    await page.setViewport(VIEWPORT_PC)
    await page.goto(BROWSER_TEST_URL)
    const { windowSize: windowSize1, textContent: textContent1 } =
      await getRenderResult(page, '#result')
    expect(windowSize1).toEqual(VIEWPORT_PC)
    expect(textContent1).toBe(TEXT_PC)

    // resize to SP viewport
    await page.setViewport(VIEWPORT_SP)
    await wait(200)
    const { windowSize: windowSize2, textContent: textContent2 } =
      await getRenderResult(page, '#result')
    expect(windowSize2).toEqual(VIEWPORT_SP)
    expect(textContent2).toBe(TEXT_SP)

    // resize to PC viewport
    await page.setViewport(VIEWPORT_PC)
    await wait(200)
    const { windowSize: windowSize3, textContent: textContent3 } =
      await getRenderResult(page, '#result')
    expect(windowSize3).toEqual(VIEWPORT_PC)
    expect(textContent3).toBe(TEXT_PC)
  })
})
