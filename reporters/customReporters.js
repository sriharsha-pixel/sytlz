// custom-reporter.js
const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor() {
    this.results = [];
  }

  onTestEnd(test, result) {
    this.results.push({
      name: test.title,
      status: result.status,
    });
  }

  onEnd() {
    const summary = {
      total: this.results.length,
      passed: this.results.filter(r => r.status === 'passed').length,
      failed: this.results.filter(r => r.status === 'failed' || r.status === 'timedOut').length,
      skipped: this.results.filter(r => r.status === 'skipped').length,
      tests: this.results,
    };

    const htmlContent = this.generateHtml(summary);
    const htmlPath = path.join(__dirname, 'custom-report.html');
    fs.writeFileSync(htmlPath, htmlContent);

    const jsonPath = path.join(__dirname, 'custom-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));

    console.log(`📄 HTML report: ${htmlPath}`);
    console.log(`📄 JSON report: ${jsonPath}`);
  }

  generateHtml(summary) {
    const statusColor = {
      passed: 'green',
      failed: 'red',
      skipped: 'orange',
    };

    const rows = summary.tests.map(test =>
      `<tr>
         <td>${test.name}</td>
         <td style="color:${statusColor[test.status]}">${test.status}</td>
       </tr>`
    ).join('\n');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Summary Report</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Test Summary</h2>
        <p><strong>Total:</strong> ${summary.total}</p>
        <p><strong>Passed:</strong> ${summary.passed}</p>
        <p><strong>Failed:</strong> ${summary.failed}</p>
        <p><strong>Skipped:</strong> ${summary.skipped}</p>

        <table>
          <thead>
            <tr>
              <th>Test Case</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
      </html>
    `;
  }
}

module.exports = CustomReporter;
