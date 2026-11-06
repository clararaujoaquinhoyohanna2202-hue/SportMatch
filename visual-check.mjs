import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})

const errors = []

async function capture(name, viewport, fullPage = true) {
  const page = await browser.newPage({ viewport })
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`${name}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`${name}: ${err.message}`))
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }))
  await page.screenshot({ path: `C:/Users/TecInfo-02/AppData/Local/Temp/opencode/${name}.png`, fullPage })
  console.log(name, JSON.stringify(overflow))
  return page
}

const desktop = await capture('sm-full-desktop', { width: 1440, height: 1000 })
await desktop.locator('#rachas').scrollIntoViewIfNeeded()
await desktop.waitForTimeout(500)
await desktop.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-listing.png' })
await desktop.locator('.racha-card .racha-join').first().click()
await desktop.waitForTimeout(500)
console.log('joined:', await desktop.locator('.racha-card').first().innerText())
await desktop.locator('.racha-card .racha-contact').first().click()
await desktop.waitForTimeout(500)
await desktop.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-contact-modal.png' })
await desktop.locator('.modal-close').click()
await desktop.locator('.header-cta').click()
await desktop.waitForTimeout(400)
await desktop.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-auth-modal.png' })
await desktop.locator('.modal-close').click()
await desktop.locator('.listing-head .btn').click()
await desktop.waitForTimeout(400)
await desktop.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-create-modal.png' })
await desktop.locator('.modal-close').click()
await desktop.close()

const mobile = await capture('sm-full-mobile', { width: 390, height: 844 })
await mobile.locator('.menu-toggle').click()
await mobile.waitForTimeout(400)
await mobile.screenshot({ path: 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/sm-mobile-menu.png' })
await mobile.close()

const tablet = await capture('sm-full-tablet', { width: 820, height: 1180 })
await tablet.close()

console.log('ERRORS', JSON.stringify(errors, null, 2))
await browser.close()
