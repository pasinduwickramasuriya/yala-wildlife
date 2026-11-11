import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_PHOTOS = 300;
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Yala+National+Park/@6.4639613,81.4693098,17z/data=!4m8!3m7!1s0x3ae5d3a62ffb9359:0x3bb623d70b5a3314!8m2!3d6.4639613!4d81.4718847!9m1!1b1!16zL20vMDJxMXo1?entry=ttu';

async function scrapeReviewPhotos() {
  const isFresh = process.argv.includes('--fresh');
  console.log(`🚀 Starting Updated Google Maps Review Photo Scraper ${isFresh ? '(FRESH MODE)' : '(RESUME MODE)'}...`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--lang=en-US']
  });

  const page = await browser.newPage();

  // Preset Google consent cookies
  await page.setCookie(
    { name: 'SOCS', value: 'CAESHAgBEhJnd3NfMjAyMzAzMjItMF9SQzEaAmRlIAEaBgiAo_CmBg', domain: '.google.com', path: '/' },
    { name: 'CONSENT', value: 'YES+cb.20230531-04-p0.en+FX+917', domain: '.google.com', path: '/' }
  );

  await page.setViewport({ width: 1400, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  const dataDir = path.join(__dirname, '../data');
  const outputPath = path.join(dataDir, 'review-photos.json');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const masterPhotoMap = new Map();
  if (!isFresh && fs.existsSync(outputPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      existing.forEach(p => { if (p.url) masterPhotoMap.set(p.url, p); });
      console.log(`📂 Resumed with ${masterPhotoMap.size} previously saved photos.`);
    } catch (e) {
      console.log('⚠️ Could not parse existing photo JSON, starting fresh.');
    }
  }

  try {
    console.log('🗺️ Navigating to Google Maps...');
    await page.goto(GOOGLE_MAPS_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 3000));

    // 1. Click Reviews Tab
    console.log('🔍 Locating and clicking Reviews tab...');
    await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, div[role="tab"], span'));
      const tab = els.find(el => (el.textContent || '').trim().toLowerCase().includes('reviews') || (el.getAttribute('aria-label') || '').toLowerCase().includes('reviews'));
      if (tab) tab.click();
    });
    await new Promise(r => setTimeout(r, 4000));

    // 2. Sort by Newest
    console.log('🔀 Sorting by "Newest"...');
    try {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const sortBtn = buttons.find(b => (b.getAttribute('aria-label') || '').toLowerCase().includes('sort') || (b.textContent || '').toLowerCase().includes('sort'));
        if (sortBtn) sortBtn.click();
      });
      await new Promise(r => setTimeout(r, 1500));
      await page.evaluate(() => {
        const menuItems = Array.from(document.querySelectorAll('div[role="menuitemradio"], div[role="option"]'));
        const newest = menuItems.find(m => (m.textContent || '').toLowerCase().includes('newest'));
        if (newest) newest.click();
        else if (menuItems.length > 1) menuItems[1].click();
      });
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.log('⚠️ Sort by newest skipped.');
    }

    let noNewDataCount = 0;
    console.log('🔄 Starting photo extraction loop...');

    for (let i = 0; i < 400; i++) {
      // Expand truncated text
      await page.evaluate(() => {
        document.querySelectorAll('button[aria-label*="See more"], button.w8nwRe, span.w8nwRe').forEach(btn => {
          try { btn.click(); } catch(e) {}
        });
      });

      // Extract batch with updated CDN support (grass-cs and googleusercontent)
      const batch = await page.evaluate(() => {
        const results = [];
        const cards = document.querySelectorAll('div[data-review-id], div.jftiEf');

        cards.forEach(card => {
          const reviewId = card.getAttribute('data-review-id') || '';
          const authorName = card.querySelector('.d4r55, .TSUbDb')?.textContent?.trim() || 'Unknown';
          const ratingLabel = card.querySelector('[aria-label*="star"]')?.getAttribute('aria-label');
          const ratingMatch = ratingLabel ? ratingLabel.match(/\d+/) : null;
          const rating = ratingMatch ? parseInt(ratingMatch[0], 10) : 0;
          const relativeTime = card.querySelector('.rsqaWe, .DU9Pgb')?.textContent?.trim() || '';
          const reviewText = card.querySelector('.wiI7pd, span[class*="wiI7pd"]')?.textContent?.trim() || '';

          // Strategy A: Background images (CSS style)
          card.querySelectorAll('[style*="background-image"]').forEach(el => {
            const style = el.getAttribute('style') || '';
            const match = style.match(/url\(["']?(https?[^"')]+)["']?\)/);
            if (match) {
              const rawUrl = match[1];
              if (rawUrl.includes('googleusercontent.com') || rawUrl.includes('grass-cs') || rawUrl.includes('ggpht.com')) {
                const fullUrl = rawUrl.replace(/=w\d+-h\d+.*$/, '=w1200-h900').replace(/=s\d+.*$/, '=s1200');
                results.push({ reviewId, authorName, rating, relativeTime, reviewText, type: 'image', url: fullUrl, thumbnailUrl: rawUrl });
              }
            }
          });

          // Strategy B: <img> tags inside review cards
          card.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src') || '';
            if ((src.includes('googleusercontent.com') || src.includes('grass-cs') || src.includes('ggpht.com')) 
                && !src.includes('=w36') && !src.includes('=w48') && !src.includes('br100') && !src.includes('-p-rp')) {
              const fullUrl = src.replace(/=w\d+-h\d+.*$/, '=w1200-h900').replace(/=s\d+.*$/, '=s1200');
              results.push({ reviewId, authorName, rating, relativeTime, reviewText, type: 'image', url: fullUrl, thumbnailUrl: src });
            }
          });
        });

        return results;
      });

      let addedCount = 0;
      for (const photo of batch) {
        if (photo.url && !masterPhotoMap.has(photo.url)) {
          masterPhotoMap.set(photo.url, photo);
          addedCount++;
        }
      }

      console.log(`   Loop ${i + 1}: Found ${batch.length} raw items | Added ${addedCount} new | Total Photos: ${masterPhotoMap.size}`);

      if (addedCount === 0) {
        noNewDataCount++;
        if (noNewDataCount >= 15) {
          console.log('⏹️ No new photos found for 15 loops. Stopping.');
          break;
        }
      } else {
        noNewDataCount = 0;
      }

      // Scroll inside `.m6QErb` container
      await page.evaluate(() => {
        const containers = Array.from(document.querySelectorAll('div.m6QErb, div[role="feed"], div[tabindex="-1"]'));
        const feed = containers.find(el => el.scrollHeight > el.clientHeight && el.clientHeight > 100);
        if (feed) feed.scrollBy(0, 2000);
        else window.scrollBy(0, 2000);
      });

      try {
        await page.mouse.move(400, 500);
        await page.mouse.wheel({ deltaY: 2000 });
      } catch (e) {}

      await new Promise(r => setTimeout(r, 3000));
    }

    const finalPhotos = Array.from(masterPhotoMap.values());
    fs.writeFileSync(outputPath, JSON.stringify(finalPhotos, null, 2));

    console.log(`\n✅ SUCCESS! Captured ${finalPhotos.length} unique photos.`);
    console.log(`🎯 Saved to: ${outputPath}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: path.join(dataDir, 'error-photos.png') });
  } finally {
    await browser.close();
  }
}

scrapeReviewPhotos();