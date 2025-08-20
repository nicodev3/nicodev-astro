const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot(url, outputPath, width = 1200, height = 800) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width, height });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Attendre un peu pour que le contenu se charge complètement
        await page.waitForTimeout(2000);

        await page.screenshot({
            path: outputPath,
            fullPage: false
        });

        console.log(`Screenshot saved: ${outputPath}`);
    } catch (error) {
        console.error(`Error taking screenshot of ${url}:`, error.message);
    } finally {
        await browser.close();
    }
}

async function main() {
    const screenshotsDir = path.join(__dirname, 'public', 'images', 'screenshots');

    const sites = [{
            url: 'https://osteopathe-toulouse-mouries.fr/',
            filename: 'osteopathe-toulouse-mouries.png'
        },
        {
            url: 'https://cours-pilates.fr/',
            filename: 'cours-pilates-fullpage.png'
        }
    ];

    for (const site of sites) {
        const outputPath = path.join(screenshotsDir, site.filename);
        console.log(`Taking screenshot of ${site.url}...`);
        await takeScreenshot(site.url, outputPath);
    }

    console.log('All screenshots completed!');
}

main().catch(console.error);