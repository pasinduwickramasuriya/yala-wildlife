import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Yala+Wildlife+Safari/@6.265796,81.2651137,14z/data=!4m12!1m2!2m1!1syala+wildlife+safari,+wickrama,+kasingama,+tissamaharama+82600!3m8!1s0x62b813f2717b2b81:0xf0b7e34cc97ec936!8m2!3d6.265796!4d81.3011626!9m1!1b1!15sCj55YWxhIHdpbGRsaWZlIHNhZmFyaSwgd2lja3JhbWEsIGthc2luZ2FtYSwgdGlzc2FtYWhhcmFtYSA4MjYwMFo9Ijt5YWxhIHdpbGRsaWZlIHNhZmFyaSB3aWNrcmFtYSBrYXNpbmdhbWEgdGlzc2FtYWhhcmFtYSA4MjYwMJIBDXRvdXJfb3BlcmF0b3KaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjVTUlZsVVFsWlNWMUpLVVcxYWJXUXlNWGxWYTJkMFpFaG5NMU5GUlJBQuABAPoBBAggEEs!16s%2Fg%2F11xsktsk1j?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D';

async function scrapeReviews() {
  console.log('🚀 Starting "Slow & Steady" Scraper...');

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US']
  });

  const page = await browser.newPage();

  // 1. Set Massive Viewport (Forces Google to render more items at once)
  await page.setViewport({ width: 1400, height: 4000 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    console.log('🗺️ Navigating...');
    await page.goto(GOOGLE_MAPS_URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // 2. ENSURE REVIEWS TAB IS ACTIVE
    const reviewsTabSelector = 'button[aria-label*="Reviews"], div[role="tab"][aria-label*="Reviews"]';
    try {
      await page.waitForSelector(reviewsTabSelector, { timeout: 5000 });
      await page.click(reviewsTabSelector);
      console.log('✅ Clicked Reviews tab.');
      await new Promise(r => setTimeout(r, 3000));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('ℹ️ Reviews tab likely active.');
    }

    // 3. SORT BY NEWEST (Reveals hidden reviews)
    console.log('🔀 Sorting by "Newest"...');
    try {
      const sortBtn = await page.$('button[aria-label*="Sort"]');
      if (sortBtn) {
        await sortBtn.click();
        await new Promise(r => setTimeout(r, 1500));
        const menuItems = await page.$$('div[role="menuitemradio"]');
        if (menuItems.length > 1) {
          await menuItems[1].click();
          console.log('✅ Sorted.');
          await new Promise(r => setTimeout(r, 5000)); // Long wait for reload
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('⚠️ Sort failed, continuing.');
    }

    // 4. LOCATE CONTAINER
    const scrollableSelector = 'div[role="main"] div[tabindex="-1"]';
    await page.waitForSelector(scrollableSelector, { timeout: 15000 });
    await page.hover(scrollableSelector); // Focus for scrolling

    // ---------------------------------------------------------
    // 5. INCREMENTAL SCRAPE LOOP
    // ---------------------------------------------------------
    console.log('🔄 Starting Extraction Loop...');

    // Master Map to store unique reviews by ID
    const masterReviewMap = new Map();
    let noNewDataCount = 0;

    // Loop up to 30 times (enough for hundreds of reviews)
    for (let i = 0; i < 30; i++) {

      // A. Scrape current view
      const batch = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div[data-review-id]'));
        return cards.map(card => {
          const getText = (sel) => card.querySelector(sel)?.textContent?.trim() || '';
          const getSrc = (sel) => card.querySelector(sel)?.src || '';
          const ratingLabel = card.querySelector('[aria-label*="stars"]')?.getAttribute('aria-label');
          const rating = ratingLabel ? parseInt(ratingLabel.match(/\d+/)?.[0] || '0') : 0;

          return {
            id: card.getAttribute('data-review-id'),
            author_name: card.getAttribute('aria-label') || getText('.d4r55'),
            profile_photo_url: getSrc('button img'),
            rating: rating,
            relative_time_description: getText('.rsqaWe') || getText('.xuAUBe'),
            text: getText('.wiI7pd')
          };
        });
      });

      // B. Add to Master List
      let addedCount = 0;
      for (const rev of batch) {
        if (!masterReviewMap.has(rev.id)) {
          masterReviewMap.set(rev.id, rev);
          addedCount++;
        }
      }

      // C. Logging
      console.log(`   Loop ${i + 1}: Found ${batch.length} visible. Added ${addedCount} new. Total Unique: ${masterReviewMap.size}`);

      // D. Stop condition
      if (addedCount === 0) {
        noNewDataCount++;
        if (noNewDataCount >= 4) { // If 4 scrolls produce no new data, we are done
          console.log('⏹️ No new reviews found for 4 loops. Stopping.');
          break;
        }
      } else {
        noNewDataCount = 0;
      }

      // E. Expand Text Buttons
      try {
        const moreBtns = await page.$$('button[aria-label*="See more"]');
        for (const btn of moreBtns) await btn.click();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) { }

      // F. Scroll Down
      await page.mouse.wheel({ deltaY: 1000 }); // Small, controlled scroll
      await new Promise(r => setTimeout(r, 2500)); // Wait for load
    }

    // ---------------------------------------------------------
    // 6. SAVE
    // ---------------------------------------------------------
    const finalReviews = Array.from(masterReviewMap.values());

    const outputPath = path.join(__dirname, '../data/reviews.json');
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, JSON.stringify(finalReviews, null, 2));

    console.log(`\n✅ FINAL SUCCESS! Captured ${finalReviews.length} unique reviews.`);
    console.log(`🎯 Saved to: ${outputPath}`);

  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    await page.screenshot({ path: 'error_final.png' });
  } finally {
    await browser.close();
  }
}

scrapeReviews();