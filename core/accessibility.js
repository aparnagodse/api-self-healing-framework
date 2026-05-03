import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import { runLighthouseAudit } from './lighthouse.js';

export async function checkAccessibility(page, testInfo, options = {}) {
  console.log('♿ Running accessibility scan...');

  const pageName = options.pageName || 'Accessibility Test Page';
  const manualFindings = options.manualFindings || [];
  const toolsUsed = options.toolsUsed || [
    'Playwright',
    'axe-core',
    'Keyboard Testing',
    'Lighthouse',
    'Manual Testing'
  ];
  const standard = options.standard || 'WCAG 2.1 Level AA';

  const safeName = pageName.replace(/\s+/g, '-').toLowerCase();

  console.log(`📍 Page Tested: ${pageName} - ${page.url()}`);

  // 1. Axe scan
  const results = await new AxeBuilder({ page }).analyze();
  const violations = results.violations || [];

  const summary = {
    total: violations.length,
    critical: violations.filter(v => v.impact === 'critical').length,
    serious: violations.filter(v => v.impact === 'serious').length,
    moderate: violations.filter(v => v.impact === 'moderate').length,
    minor: violations.filter(v => v.impact === 'minor').length,
  };

  const axeScore = calculateScore(summary);
  console.log(`🏆 Axe Accessibility Score: ${axeScore}/100`);

  // 2. Keyboard / WCAG quick checks
  const keyboardIssues = await checkKeyboardNavigation(page);
  const wcagIssues = await checkWCAGBasics(page);

  // 3. Lighthouse
  console.log('🔦 Running Lighthouse accessibility audit...');
  const lighthouseResult = await runLighthouseAudit(page.url(), pageName);
  console.log(`🔦 Lighthouse Score: ${lighthouseResult.score}/100`);

  // 4. Screenshot
  const screenshotPath = `test-results/${safeName}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // 5. Unified findings
  const auditFindings = [];

  for (const violation of violations) {
    const target = violation.nodes?.[0]?.target?.join(', ') || pageName;
    const failureSummary =
      violation.nodes?.[0]?.failureSummary ||
      violation.description ||
      'No summary available';

    auditFindings.push({
      source: 'Axe',
      issue: violation.help || violation.id,
      wcag: inferWcagFromRule(violation.id),
      severity: normalizeSeverity(violation.impact || 'moderate'),
      location: improveLocation(target, pageName),
      observed: failureSummary,
      impact: violation.description || 'Accessibility issue detected by Axe scan.',
      recommendation: `Review ${violation.id} and apply remediation guidance from ${violation.helpUrl || 'Axe documentation'}.`
    });
  }

  keyboardIssues.forEach(issue => {
    auditFindings.push({
      source: 'Keyboard Check',
      issue,
      wcag: '2.1.1 Keyboard / 2.4.7 Focus Visible',
      severity: 'Moderate',
      location: `${pageName} → Keyboard navigation`,
      observed: issue,
      impact: 'Keyboard-only users may be unable to navigate or identify active elements correctly.',
      recommendation: 'Validate focus order, focus visibility, and keyboard operability for interactive elements.'
    });
  });

  wcagIssues.forEach(issue => {
    auditFindings.push({
      source: 'WCAG Quick Check',
      issue,
      wcag: inferWcagFromQuickIssue(issue),
      severity: 'Moderate',
      location: pageName,
      observed: issue,
      impact: 'This may reduce accessibility for assistive technology users.',
      recommendation: generateQuickRecommendation(issue)
    });
  });

  const lighthouseAudits = lighthouseResult?.audits || {};
  const failedLighthouseAudits = Object.values(lighthouseAudits).filter(
    a => a && typeof a.score === 'number' && a.score < 1
  );

  failedLighthouseAudits.slice(0, 5).forEach(audit => {
    auditFindings.push({
      source: 'Lighthouse',
      issue: audit.title || 'Lighthouse accessibility issue',
      wcag: inferWcagFromLighthouseTitle(audit.title || ''),
      severity: 'Moderate',
      location: pageName,
      observed: audit.description || 'Issue flagged by Lighthouse accessibility audit.',
      impact: audit.displayValue || 'Potential accessibility impact detected.',
      recommendation: `Review and address the Lighthouse finding: ${audit.title}.`
    });
  });

  manualFindings.forEach(f => {
    auditFindings.push({
      source: f.source || 'Manual',
      issue: f.issue || f.title || 'Manual accessibility finding',
      wcag: f.wcag || 'WCAG 2.1',
      severity: f.severity || 'Moderate',
      location: f.location || pageName,
      observed: f.observed || 'Manual issue observed during validation.',
      impact: f.impact || 'May affect accessibility and usability.',
      recommendation: f.recommendation || 'Review and remediate manually observed issue.'
    });
  });

  // 6. Executive summary text
  const executiveSummary = buildExecutiveSummary(pageName, summary, auditFindings);

  // 7. Save history
  saveHistory({
    pageName,
    url: page.url(),
    axeSummary: summary,
    axeScore,
    lighthouseScore: lighthouseResult.score,
    totalFindings: auditFindings.length
  });

  // 8. Save JSON
  const jsonReportPath = `${safeName}-audit-report.json`;
  const jsonPayload = {
    pageName,
    url: page.url(),
    standard,
    toolsUsed,
    executiveSummary,
    axeSummary: summary,
    axeScore,
    lighthouseScore: lighthouseResult.score,
    findings: auditFindings
  };
  fs.writeFileSync(jsonReportPath, JSON.stringify(jsonPayload, null, 2), 'utf-8');

  // 9. Generate HTML
  const htmlReportPath = generateHTMLAuditReport({
    pageName,
    url: page.url(),
    standard,
    toolsUsed,
    executiveSummary,
    axeSummary: summary,
    axeScore,
    lighthouseScore: lighthouseResult.score,
    findings: auditFindings,
    screenshotPath
  });

  // 10. Attachments
  if (testInfo) {
    await testInfo.attach('Accessibility Audit Summary', {
      body: JSON.stringify(jsonPayload, null, 2),
      contentType: 'application/json',
    });

    if (fs.existsSync(htmlReportPath)) {
      await testInfo.attach(`${pageName} HTML Audit Report`, {
        path: htmlReportPath,
        contentType: 'text/html',
      });
    }

    if (fs.existsSync(jsonReportPath)) {
      await testInfo.attach(`${pageName} JSON Audit Report`, {
        path: jsonReportPath,
        contentType: 'application/json',
      });
    }

    if (fs.existsSync(screenshotPath)) {
      await testInfo.attach(`${pageName} Screenshot`, {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  }

  return {
    pageName,
    axeScore,
    lighthouseScore: lighthouseResult.score,
    findings: auditFindings,
    htmlReportPath,
    jsonReportPath,
    screenshotPath
  };
}

function calculateScore(summary) {
  let score = 100;
  score -= summary.critical * 10;
  score -= summary.serious * 5;
  score -= summary.moderate * 2;
  score -= summary.minor * 1;
  return Math.max(score, 0);
}

async function checkKeyboardNavigation(page) {
  const issues = [];

  try {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.outerHTML);
    if (!focused) {
      issues.push('No element receives focus on Tab');
    }
  } catch {
    issues.push('Keyboard navigation failed');
  }

  return issues;
}

async function checkWCAGBasics(page) {
  const issues = [];

  const imagesWithoutAlt = await page.$$eval('img:not([alt])', imgs => imgs.length);
  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt text`);
  }

  const emptyButtons = await page.$$eval(
    'button',
    btns => btns.filter(b => !b.innerText.trim()).length
  );
  if (emptyButtons > 0) {
    issues.push(`${emptyButtons} buttons without text`);
  }

  return issues;
}

function saveHistory(data) {
  const file = 'accessibility-history.json';
  let history = [];

  if (fs.existsSync(file)) {
    try {
      history = JSON.parse(fs.readFileSync(file, 'utf-8'));
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }
  }

  history.push({
    date: new Date().toISOString(),
    ...data
  });

  fs.writeFileSync(file, JSON.stringify(history, null, 2));
}

function generateHTMLAuditReport(data) {
  const safeFileName = `${data.pageName.replace(/\s+/g, '-').toLowerCase()}-audit-report.html`;

  const findingRows = data.findings.map(f => `
    <tr>
      <td>${escapeHtml(f.source)}</td>
      <td>${escapeHtml(f.issue)}</td>
      <td>${escapeHtml(f.wcag)}</td>
      <td>${escapeHtml(f.severity)}</td>
      <td>${escapeHtml(f.location)}</td>
      <td>${escapeHtml(f.observed)}</td>
      <td>${escapeHtml(f.impact)}</td>
      <td>${escapeHtml(f.recommendation)}</td>
    </tr>
  `).join('');

  const toolsList = data.toolsUsed.map(t => `<li>${escapeHtml(t)}</li>`).join('');
  const screenshotFileName = data.screenshotPath ? path.basename(data.screenshotPath) : '';

  const html = `
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${escapeHtml(data.pageName)} Audit Report</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; color: #222; line-height: 1.45; }
      .card { padding: 12px 16px; margin: 6px; display: inline-block; background: #f4f8fb; border-left: 4px solid #007acc; border-radius: 6px; }
      table { border-collapse: collapse; width: 100%; margin-top: 20px; font-size: 14px; }
      th, td { border: 1px solid #ddd; padding: 10px; vertical-align: top; }
      th { background: #333; color: white; text-align: left; }
      h1, h2 { margin-top: 28px; }
      .summary { background: #fafafa; padding: 14px; border-left: 4px solid #666; margin-top: 12px; }
      .evidence-img { max-width: 100%; border: 1px solid #ccc; margin-top: 12px; }
      .muted { color: #666; font-size: 13px; }
    </style>
  </head>
  <body>
    <h1>Accessibility Audit Report</h1>

    <h2>Page Details</h2>
    <p><strong>Page:</strong> ${escapeHtml(data.pageName)}</p>
    <p><strong>URL:</strong> ${escapeHtml(data.url)}</p>
    <p><strong>Standard:</strong> ${escapeHtml(data.standard)}</p>

    <h2>Executive Summary</h2>
    <div class="summary">${escapeHtml(data.executiveSummary)}</div>

    <h2>Tools Used</h2>
    <ul>${toolsList}</ul>

    <h2>Score Summary</h2>
    <div class="card"><strong>Axe Score:</strong> ${data.axeScore}/100</div>
    <div class="card"><strong>Lighthouse Score:</strong> ${data.lighthouseScore}/100</div>
    <div class="card"><strong>Total Findings:</strong> ${data.findings.length}</div>
    <div class="card"><strong>Critical:</strong> ${data.axeSummary.critical}</div>
    <div class="card"><strong>Serious:</strong> ${data.axeSummary.serious}</div>
    <div class="card"><strong>Moderate:</strong> ${data.axeSummary.moderate}</div>
    <div class="card"><strong>Minor:</strong> ${data.axeSummary.minor}</div>

    <h2>Evidence</h2>
    ${
      screenshotFileName
        ? `<img class="evidence-img" src="${escapeHtml(screenshotFileName)}" alt="${escapeHtml(data.pageName)} screenshot evidence" />
           <p class="muted">Screenshot captured during test execution.</p>`
        : `<p class="muted">No screenshot available.</p>`
    }

    <h2>Detailed Accessibility Findings</h2>
    <table>
      <tr>
        <th>Source</th>
        <th>Issue</th>
        <th>WCAG</th>
        <th>Severity</th>
        <th>Location</th>
        <th>Observed Behaviour</th>
        <th>Impact</th>
        <th>Recommendation</th>
      </tr>
      ${findingRows || '<tr><td colspan="8">No findings recorded</td></tr>'}
    </table>
  </body>
  </html>
  `;

  fs.writeFileSync(safeFileName, html, 'utf-8');

  // copy screenshot next to report so HTML can display it locally
  if (data.screenshotPath && fs.existsSync(data.screenshotPath)) {
    const dest = path.join(path.dirname(safeFileName), path.basename(data.screenshotPath));
    fs.copyFileSync(data.screenshotPath, dest);
  }

  return safeFileName;
}

function buildExecutiveSummary(pageName, summary, findings) {
  const highSeverity = findings.filter(f => ['Critical', 'Serious'].includes(f.severity)).length;
  return `${pageName} was evaluated against WCAG 2.1 using automated and manual validation. The review identified ${findings.length} findings, including ${highSeverity} higher-severity items. Key themes include document structure, keyboard usability, semantic clarity, and assistive technology support. Remediation should prioritise findings that affect navigation, form usability, and screen reader interpretation.`;
}

function inferWcagFromRule(ruleId) {
  const map = {
    'button-name': '4.1.2 Name, Role, Value',
    'image-alt': '1.1.1 Non-text Content',
    'label': '3.3.2 Labels or Instructions',
    'color-contrast': '1.4.3 Contrast (Minimum)',
    'link-name': '2.4.4 Link Purpose',
    'landmark-one-main': '1.3.1 Info and Relationships',
    'page-has-heading-one': '2.4.6 Headings and Labels',
    'aria-allowed-role': '4.1.2 Name, Role, Value',
    'aria-required-attr': '4.1.2 Name, Role, Value'
  };
  return map[ruleId] || 'WCAG 2.1 A / AA';
}

function inferWcagFromQuickIssue(issue) {
  if (issue.includes('alt')) return '1.1.1 Non-text Content';
  if (issue.includes('buttons without text')) return '4.1.2 Name, Role, Value';
  return 'WCAG 2.1 A / AA';
}

function inferWcagFromLighthouseTitle(title) {
  if (title.includes('[tabindex]')) return '2.4.3 Focus Order';
  if (title.toLowerCase().includes('heading')) return '2.4.6 Headings and Labels';
  if (title.toLowerCase().includes('label')) return '3.3.2 Labels or Instructions';
  return 'WCAG 2.1 A / AA';
}

function generateQuickRecommendation(issue) {
  if (issue.includes('alt')) return 'Add meaningful alt text to images.';
  if (issue.includes('buttons without text')) return 'Ensure buttons have visible or programmatic accessible names.';
  return 'Review and remediate the identified accessibility issue.';
}

function normalizeSeverity(value) {
  const v = String(value).toLowerCase();
  if (v === 'critical') return 'Critical';
  if (v === 'serious') return 'Serious';
  if (v === 'minor') return 'Minor';
  return 'Moderate';
}

function improveLocation(rawLocation, pageName) {
  if (!rawLocation || rawLocation === 'html') return `${pageName} → Main document structure`;
  return rawLocation;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}