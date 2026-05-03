import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'fs';

export async function runLighthouseAudit(url, pageName = 'page') {
  const safeName = pageName.replace(/\s+/g, '-').toLowerCase();
  const htmlReportPath = `${safeName}-lighthouse-report.html`;
  const jsonReportPath = `${safeName}-lighthouse-report.json`;

  let chrome;

  try {
    // 🔹 Launch Chrome
    chrome = await launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    });

    // 🔹 Run Lighthouse
    const result = await lighthouse(url, {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['accessibility']
    });

    const htmlReport = result.report[0];
    const jsonReport = result.report[1];

    fs.writeFileSync(htmlReportPath, htmlReport);
    fs.writeFileSync(jsonReportPath, jsonReport);

    const score = Math.round(
      (result.lhr.categories.accessibility.score || 0) * 100
    );

    console.log(`🔦 Lighthouse report generated: ${htmlReportPath}`);
    console.log(`🔦 Lighthouse score: ${score}/100`);

    return {
      score,
      htmlReportPath,
      jsonReportPath,
      audits: result.lhr.audits || {}
    };

  } catch (err) {
    console.warn('⚠️ Lighthouse failed (ignored):', err.message);

    return {
      score: 'N/A',
      htmlReportPath: null,
      jsonReportPath: null,
      audits: {}
    };

  } finally {
    // 🔹 Safe Chrome cleanup (Windows fix)
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {
        console.warn('⚠️ Chrome cleanup failed (ignored)');
      }
    }
  }
}