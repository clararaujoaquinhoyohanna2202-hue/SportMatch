import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})

const errors = []
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
page.on('pageerror', (err) => errors.push(err.message))
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
console.log(
  'desktop widths',
  await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]),
)
await page.evaluate(() => document.querySelector('.cta-panel').scrollIntoView({ block: 'center' }))
await page.waitForTimeout(500)
await page.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-cta.png' })

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
mobile.on('pageerror', (err) => errors.push(err.message))
await mobile.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(1000)
console.log(
  'mobile widths',
  await mobile.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]),
)
await mobile.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-mobile-hero.png' })
await mobile.locator('#rachas').scrollIntoViewIfNeeded()
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-mobile-listing.png' })
await mobile.locator('.header-brand').click()
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-mobile-hero-2.png' })

const tablet = await browser.newPage({ viewport: { width: 820, height: 1180 } })
await tablet.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await tablet.waitForTimeout(800)
console.log(
  'tablet widths',
  await tablet.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]),
)
await tablet.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-tablet-hero.png' })

console.log('ERRORS', errors)
await browser.close()
