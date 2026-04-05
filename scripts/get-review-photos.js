import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Same Google Maps URL used in get-reviews.js
// const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Yala+National+Park+-+Main+Entrance/@6.2814969,81.4126321,17z/data=!4m16!1m9!3m8!1s0x3ae68358635c6555:0x8803c888ea746b75!2sYala+National+Park+-+Main+Entrance!8m2!3d6.2814969!4d81.4126321!9m1!1b1!16s%2Fg%2F11srm__g51!3m5!1s0x3ae68358635c6555:0x8803c888ea746b75!8m2!3d6.2814969!4d81.4126321!16s%2Fg%2F11srm__g51?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D';
const GOOGLE_MAPS_URL='https://www.google.com/maps/place/Yala+National+Park/@6.4639613,81.4693098,17z/data=!4m8!3m7!1s0x3ae5d3a62ffb9359:0x3bb623d70b5a3314!8m2!3d6.4639613!4d81.4718847!9m1!1b1!16zL20vMDJxMXo1?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D';
async function scrapeReviewPhotos() {
  console.log('🚀 Starting Review Photo Scraper...');

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 4000 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    console.log('🗺️  Navigating to Google Maps...');
    await page.goto(GOOGLE_MAPS_URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // Step 1: Click the "Reviews" tab to make sure we're on the reviews view
    const reviewsTabSelector = 'button[aria-label*="Reviews"], div[role="tab"][aria-label*="Reviews"]';
    try {
      await page.waitForSelector(reviewsTabSelector, { timeout: 5000 });
      await page.click(reviewsTabSelector);
      console.log('✅ Clicked Reviews tab.');
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.log('ℹ️  Reviews tab likely already active.');
    }

    // Step 2: Sort by Newest to maximize variety
    console.log('🔀 Sorting by "Newest"...');
    try {
      const sortBtn = await page.$('button[aria-label*="Sort"]');
      if (sortBtn) {
        await sortBtn.click();
        await new Promise(r => setTimeout(r, 1500));
        const menuItems = await page.$$('div[role="menuitemradio"]');
        if (menuItems.length > 1) {
          await menuItems[1].click();
          console.log('✅ Sorted by newest.');
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    } catch (e) {
      console.log('⚠️  Sort failed, continuing.');
    }

    // Step 3: Locate scrollable container
    const scrollableSelector = 'div[role="main"] div[tabindex="-1"]';
    await page.waitForSelector(scrollableSelector, { timeout: 15000 });
    await page.hover(scrollableSelector);

    // Step 4: Incremental scroll + photo extraction loop
    console.log('🔄 Starting photo extraction loop...');

    // Use a Map keyed by URL to deduplicate
    const masterPhotoMap = new Map();
    let noNewDataCount = 0;

    for (let i = 0; i < 350; i++) {

      // A. Extract all visible review photo/video links from the current DOM
      const batch = await page.evaluate(() => {
        const results = [];
        const reviewCards = Array.from(document.querySelectorAll('div[data-review-id]'));

        for (const card of reviewCards) {
          const reviewId = card.getAttribute('data-review-id');
          const authorName = card.getAttribute('aria-label') || card.querySelector('.d4r55')?.textContent?.trim() || 'Unknown';
          const ratingLabel = card.querySelector('[aria-label*="stars"]')?.getAttribute('aria-label');
          const rating = ratingLabel ? parseInt(ratingLabel.match(/\d+/)?.[0] || '0') : 0;
          const relativeTime = card.querySelector('.rsqaWe')?.textContent?.trim() || card.querySelector('.xuAUBe')?.textContent?.trim() || '';
          const reviewText = card.querySelector('.wiI7pd')?.textContent?.trim() || '';

          // --- Extract Images ---
          // Google stores review photos as background-image CSS on button/div elements,
          // or as <img> tags inside photo thumbnail containers.
          // Strategy A: background-image on thumbnail buttons
          const thumbnailBtns = Array.from(card.querySelectorAll('button[style*="background-image"]'));
          for (const btn of thumbnailBtns) {
            const style = btn.getAttribute('style') || '';
            const match = style.match(/url\(["']?(https?[^"')]+)["']?\)/);
            if (match) {
              const rawUrl = match[1];
              // Convert small thumbnail to a higher resolution version
              // Google photo URLs have size params like =w200-h200 -> replace with =w1200-h900
              const fullUrl = rawUrl.replace(/=w\d+-h\d+.*$/, '=w1200-h900').replace(/=s\d+.*$/, '=s1200');
              results.push({
                reviewId,
                authorName,
                rating,
                relativeTime,
                reviewText: reviewText.slice(0, 200),
                type: 'image',
                url: fullUrl,
                thumbnailUrl: rawUrl,
              });
            }
          }

          // Strategy B: <img> tags inside the review card (covers some layouts)
          const imgTags = Array.from(card.querySelectorAll('img[src*="googleusercontent.com"]'));
          for (const img of imgTags) {
            const src = img.getAttribute('src') || '';
            // Skip profile photos (they are small circular avatars, usually under 100px)
            if (src.includes('=w36') || src.includes('=w48') || src.includes('=w100')
              || src.includes('-p-rp') || src.includes('br100')) continue;
            const fullUrl = src.replace(/=w\d+-h\d+.*$/, '=w1200-h900').replace(/=s\d+.*$/, '=s1200');
            results.push({
              reviewId,
              authorName,
              rating,
              relativeTime,
              reviewText: reviewText.slice(0, 200),
              type: 'image',
              url: fullUrl,
              thumbnailUrl: src,
            });
          }

          // Strategy C: Video thumbnails – Google wraps videos in elements with data-video-id or similar
          const videoEls = Array.from(card.querySelectorAll('[data-video-id], video, [aria-label*="video" i]'));
          for (const el of videoEls) {
            const videoId = el.getAttribute('data-video-id') || '';
            const posterSrc = el.getAttribute('poster') || el.querySelector('img')?.getAttribute('src') || '';
            const videoSrc = el.getAttribute('src') || el.querySelector('source')?.getAttribute('src') || '';
            if (videoId || videoSrc) {
              results.push({
                reviewId,
                authorName,
                rating,
                relativeTime,
                reviewText: reviewText.slice(0, 200),
                type: 'video',
                url: videoSrc || `https://maps.google.com/?video=${videoId}`,
                thumbnailUrl: posterSrc,
                videoId,
              });
            }
          }
        }
        return results;
      });

      // B. Deduplicate by URL
      let addedCount = 0;
      for (const photo of batch) {
        if (photo.url && !masterPhotoMap.has(photo.url)) {
          masterPhotoMap.set(photo.url, photo);
          addedCount++;
        }
      }

      console.log(`   Loop ${i + 1}: Found ${batch.length} raw items. Added ${addedCount} new. Total: ${masterPhotoMap.size}`);

      // C. Stop condition
      if (addedCount === 0) {
        noNewDataCount++;
        if (noNewDataCount >= 10) {
          console.log('⏹️  No new photos found for 10 loops. Stopping.');
          break;
        }
      } else {
        noNewDataCount = 0;
      }

      // D. Expand "See more" buttons so more text/photos become visible
      try {
        const moreBtns = await page.$$('button[aria-label*="See more"]');
        for (const btn of moreBtns) await btn.click();
      } catch (e) { /* ignore */ }

      // E. Scroll
      await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div[data-review-id]'));
        if (cards.length > 0) {
          cards[cards.length - 1].scrollIntoView({ behavior: 'auto', block: 'end' });
        }
        const scrollContainers = Array.from(document.querySelectorAll('.m6QErb[aria-label]'));
        for (const el of scrollContainers) {
          if (el.scrollHeight > el.clientHeight) {
            el.scrollTop = el.scrollHeight;
          }
        }
      });

      await page.mouse.wheel({ deltaY: 2000 });
      await new Promise(r => setTimeout(r, 4000));
    }

    // Step 5: Save results
    const finalPhotos = Array.from(masterPhotoMap.values());

    const outputPath = path.join(__dirname, '../data/review-photos.json');
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, JSON.stringify(finalPhotos, null, 2));

    console.log(`\n✅ DONE! Captured ${finalPhotos.length} unique review photos/videos.`);
    console.log(`🎯 Saved to: ${outputPath}`);

  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    await page.screenshot({ path: 'error_review_photos.png' });
  } finally {
    await browser.close();
  }
}

scrapeReviewPhotos();
