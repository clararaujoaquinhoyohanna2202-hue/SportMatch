import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})

for (const width of [320, 360, 768, 1024, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const info = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    activeElement: document.activeElement?.tagName + '.' + document.activeElement?.className,
    heroTitle: document.querySelector('.hero-brand h1')?.getBoundingClientRect(),
    phone: document.querySelector('.phone')?.getBoundingClientRect(),
  }))
  console.log(width, JSON.stringify(info))
  await page.close()
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-mobile-stores.png', clip: { x: 0, y: 600, width: 390, height: 244 } })
await mobile.keyboard.press('Tab')
console.log('after tab:', await mobile.evaluate(() => document.activeElement?.className))
await mobile.evaluate(() => window.scrollTo({ top: document.querySelector('#rachas').offsetTop - 80, behavior: 'instant' }))
await mobile.waitForTimeout(400)
await mobile.keyboard.press('Tab')
console.log('after tab 2:', await mobile.evaluate(() => document.activeElement?.className))
await mobile.close()

const tablet = await browser.newPage({ viewport: { width: 768, height: 1024 } })
await tablet.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await tablet.waitForTimeout(500)
await tablet.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-768-hero.png' })
await tablet.close()

await browser.close()
