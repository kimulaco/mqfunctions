import type { ElementHandle, Page } from 'puppeteer'

export type WindowSize = {
  width: number
  height: number
}

export const getInnerText = async (
  element: ElementHandle<Element> | null,
): Promise<string> => {
  const textContent = await element?.getProperty('textContent')
  const value = await textContent?.jsonValue()
  return value || ''
}

export const getWindowSize = (page: Page): Promise<WindowSize> => {
  return page.evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })
}

export const getRenderResult = async (
  page: Page,
  targetId: string,
): Promise<{
  windowSize: WindowSize
  textContent: string
}> => {
  const windowSize = await getWindowSize(page)
  const element = await page.$(targetId)
  const textContent = await getInnerText(element)
  return {
    windowSize,
    textContent,
  }
}

export const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
