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
        await new Promise(resolve => setTimeout(resolve, 3000));

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
            url: 'https://psychologue-leslilas.fr/',
            filename: 'psychologue-leslilas.png'
        },
        {
            url: 'https://psy-emdr-cotebasque.fr',
            filename: 'psy-emdr-cotebasque.fr.png'
        },
        {
            url: 'https://psychologue-limoges.fr/',
            filename: 'cazas-audureau.jpg'
        },
        {
            url: 'https://montpellier-psychologue.pro',
            filename: 'psy-montpellier.png'
        },
        {
            url: 'https://psychologue-manosque.net/',
            filename: 'psy-manosque.png'
        },
        {
            url: 'https://psychologue-sorgues.fr/',
            filename: 'psy-sorgues.png'
        },
        {
            url: 'https://psychologue-sarrebourg.fr/',
            filename: 'psy-sarrebourg.png'
        },
        {
            url: 'https://psychologue-andrezieux-boutheon.fr/',
            filename: 'psy-andrezieux.jpg'
        },
        {
            url: 'https://osteopathe-toulouse-mouries.fr/',
            filename: 'osteopathe-toulouse-mouries.png'
        },
        {
            url: 'https://cours-pilates.fr/',
            filename: 'cours-pilates-fullpage.png'
        }
    ];

    console.log('Starting screenshots for all portfolio sites...');

    for (const site of sites) {
        const outputPath = path.join(screenshotsDir, site.filename);
        console.log(`\nTaking screenshot of ${site.url}...`);
        await takeScreenshot(site.url, outputPath);

        // Petite pause entre les captures pour éviter de surcharger les serveurs
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\nAll screenshots completed!');
}

main().catch(console.error);