import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
})
const base = 'http://127.0.0.1:4173/'
const out = 'C:/Users/TecInfo-02/AppData/Local/Temp/opencode/'

const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.evaluate(() => {
  const el = document.querySelector('#rachas')
  window.scrollTo({ top: el.offsetTop - 88, behavior: 'instant' })
})
await page.waitForTimeout(900)
await page.screenshot({ path: `${out}sm-mobile-listing-top.png` })
await page.locator('.guide-section').screenshot({ path: `${out}sm-mobile-guide.png` })
await page.locator('.cta-panel').screenshot({ path: `${out}sm-mobile-cta.png` })
await page.locator('.features-section').screenshot({ path: `${out}sm-mobile-features.png` })

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await desktop.goto(base, { waitUntil: 'networkidle' })
await desktop.waitForTimeout(800)
await desktop.locator('.cta-panel').screenshot({ path: `${out}sm-cta-panel.png` })
await desktop.locator('.site-footer').screenshot({ path: `${out}sm-footer.png` })

// functional flow
const flow = await browser.newPage({ viewport: { width: 1280, height: 900 } })
flow.on('pageerror', (error) => console.log('PAGEERROR', error.message))
await flow.goto(base, { waitUntil: 'networkidle' })
await flow.waitForTimeout(500)
await flow.locator('.header-cta').click()
await flow.locator('.auth-tabs button').nth(1).click()
await flow.locator('input[autocomplete="name"]').fill('Ana Souza')
await flow.locator('input[type="email"]').fill('ana.souza@teste.com')
await flow.locator('input[type="password"]').fill('123456')
await flow.locator('.modal-submit').click()
await flow.waitForTimeout(500)
console.log('header after auth:', await flow.locator('.user-menu').innerText())
console.log('toast:', await flow.locator('.toast').innerText())
await flow.locator('.listing-head .btn').click()
await flow.locator('input[placeholder^="Ex.: Racha"]').fill('Vôlei de sexta')
await flow.locator('select').first().selectOption('Vôlei')
await flow.locator('input[placeholder*="Ginásio"]').fill('Gin. Central')
await flow.locator('.modal-submit').click()
await flow.waitForTimeout(1200)
console.log('first card:', (await flow.locator('.racha-card').first().innerText()).replace(/\n/g, ' | '))
console.log('toast:', await flow.locator('.toast').innerText())
await flow.reload({ waitUntil: 'networkidle' })
await flow.waitForTimeout(500)
console.log('persisted user:', await flow.locator('.user-menu').innerText())
console.log('persisted card:', (await flow.locator('.racha-card').first().innerText()).replace(/\n/g, ' | '))
await flow.locator('.racha-card .racha-contact').first().click()
await flow.waitForTimeout(400)
console.log('contact no phone:', (await flow.locator('.modal-panel').innerText()).slice(0, 600).replace(/\n/g, ' | '))
await flow.locator('.modal-close').click()
await flow.locator('.search-field input').fill('zzzz')
await flow.waitForTimeout(300)
console.log('empty state:', (await flow.locator('.listing-empty').innerText()).replace(/\n/g, ' | '))
await flow.locator('.empty-actions .btn').first().click()
await flow.waitForTimeout(300)
console.log('after clear count:', await flow.locator('.racha-card').count())

await browser.close()
