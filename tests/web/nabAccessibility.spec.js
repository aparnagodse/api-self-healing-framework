import { test } from '@playwright/test';
import { checkAccessibility } from '../../core/accessibility.js';
test.setTimeout(120000);

test.describe('NAB Accessibility Demo', () => {
  test('NAB homepage accessibility', async ({ page }, testInfo) => {
    const manualFindings = [
      {
        source: 'Manual',
        issue: 'Menu does not close on Escape',
        wcag: '2.1.1 Keyboard',
        severity: 'Moderate',
        location: 'Homepage → Main navigation',
        observed: 'After pressing Escape, focus returns to the menu trigger but the menu remains open.',
        impact: 'Keyboard users may experience confusion and difficulty exiting navigation.',
        recommendation: 'Ensure Escape closes the menu and restores focus correctly.'
      },
      {
        source: 'Manual',
        issue: 'Unclear screen reader announcement for "Explore NAB savings accounts"',
        wcag: '4.1.2 Name, Role, Value',
        severity: 'Serious',
        location: 'Homepage → CTA link',
        observed: 'The link announcement is not sufficiently descriptive for screen reader users.',
        impact: 'Users relying on assistive technologies may not understand the purpose of the control.',
        recommendation: 'Expose a clearer accessible name using proper semantic labeling.'
      }
    ];

    await page.goto('https://www.nab.com.au/', { waitUntil: 'domcontentloaded' });

    await checkAccessibility(page, testInfo, {
      pageName: 'NAB Homepage',
      standard: 'WCAG 2.1 Level AA',
      toolsUsed: [
        'Playwright',
        'axe-core',
        'Keyboard Testing',
        'Lighthouse',
        'Manual Testing'
      ],
      manualFindings
    });
  });

  test('NAB login page accessibility', async ({ page }, testInfo) => {
    const manualFindings = [
      {
        source: 'Manual',
        issue: 'Form labels require validation',
        wcag: '3.3.2 Labels or Instructions',
        severity: 'Moderate',
        location: 'Login page → NAB ID and Password fields',
        observed: 'Visible labels are present, but programmatic association should be validated.',
        impact: 'Screen reader users may struggle to identify fields correctly.',
        recommendation: 'Ensure each input is explicitly associated with its label.'
      },
      {
        source: 'Manual',
        issue: 'Focus visibility and order require validation',
        wcag: '2.4.3 Focus Order / 2.4.7 Focus Visible',
        severity: 'Moderate',
        location: 'Login page → Form controls',
        observed: 'Focus state and navigation order require validation during keyboard interaction.',
        impact: 'Keyboard users may find form navigation inconsistent.',
        recommendation: 'Ensure focus is visible and follows a logical tab order.'
      },
      {
        source: 'Manual',
        issue: 'Checkbox accessibility requires validation',
        wcag: '4.1.2 Name, Role, Value',
        severity: 'Moderate',
        location: 'Login page → "Remember my NAB ID" checkbox',
        observed: 'The checkbox label and announced state should be validated with assistive technologies.',
        impact: 'Users may not understand the checkbox purpose or current state.',
        recommendation: 'Ensure checkbox is properly labelled and its checked/unchecked state is announced correctly.'
      },
      {
        source: 'Manual',
        issue: 'Error handling requires validation',
        wcag: '3.3.1 Error Identification',
        severity: 'Moderate',
        location: 'Login page → Form submission / validation state',
        observed: 'Error messaging is not visible in the current test state and must be validated separately.',
        impact: 'Users may not understand why form submission fails.',
        recommendation: 'Ensure errors are clearly displayed, programmatically associated, and announced to assistive technologies.'
      }
    ];

    await page.goto('https://ib.nab.com.au/login', { waitUntil: 'domcontentloaded' });

    await checkAccessibility(page, testInfo, {
      pageName: 'NAB Login Page',
      standard: 'WCAG 2.1 Level AA',
      toolsUsed: [
        'Playwright',
        'axe-core',
        'Keyboard Testing',
        'Lighthouse',
        'Manual Testing'
      ],
      manualFindings
    });
  });
});