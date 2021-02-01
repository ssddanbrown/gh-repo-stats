const fs = require('fs').promises;
const path = require('path');
const fetchIssues = require('./fetch-issues');

const recentIssuesCount = require('./reports/recent-issues-count');

/**
 * Array of reporter functions.
 * These take an array of issues and return report data.
 * @type {Object<String, Function>}
 */
const reports = {
    issues_opened_by_month_cumulative: require('./reports/issues-opened-by-month-cumulative'),
    issues_opened_by_month: require('./reports/issues-opened-by-month'),
    issues_closed_by_month: require('./reports/issues-closed-by-month'),
    issues_created_30_days: recentIssuesCount(30, 'created_at', false),
    issues_created_90_days: recentIssuesCount(90, 'created_at', false),
    issues_closed_30_days: recentIssuesCount(30, 'closed_at', false),
    issues_closed_90_days: recentIssuesCount(90, 'closed_at', false),
    prs_created_30_days: recentIssuesCount(30, 'created_at', true),
    prs_created_90_days: recentIssuesCount(90, 'created_at', true),
    prs_closed_30_days: recentIssuesCount(30, 'closed_at', true),
    prs_closed_90_days: recentIssuesCount(90, 'closed_at', true),
};

module.exports = async function generate() {
    const issues = await fetchIssues();
    await writeToGen('issues', issues);

    const output = {};
    for (const [name, reportFunc] of Object.entries(reports)) {
        output[name] = reportFunc(issues);
    }
    await writeToGen('chart-data', output);
}

/**
 * Write out the given data to the gen directory.
 * @param {String} filename
 * @param {Object} data
 * @returns {Promise<void>}
 */
async function writeToGen(filename, data) {
    const json = JSON.stringify(data, null, 2);
    const fileData = `window.${filename.split('-').join('_')} = ` + json;
    const filePath = path.join(__dirname, '../public/gen', filename + '.js');
    await fs.writeFile(filePath, fileData, 'utf8');
}