const fs = require('fs').promises;
const path = require('path');
const fetchData = require('./fetch-data');

const recentIssuesCount = require('./reports/recent-issues-count');

/**
 * Array of reporter functions.
 * These take an array of issues and return report data.
 * @type {Object<String, Function>}
 */
const issue_reports = {
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

/**
 * Array of reporter functions.
 * These take an array of stars and return report data.
 * @type {Object<String, Function>}
 */
const star_reports = {
    stars_by_month: require('./reports/stars-by-month'),
    stars_by_month_cumulative: require('./reports/stars-by-month-cumulative'),
};

module.exports = async function generate() {
    const issues = await fetchData.issues();
    const issueChartData = runReportsOnData(issue_reports, issues);

    const stars = await fetchData.stars();
    const starChartData = runReportsOnData(star_reports, stars);

    const chartData = Object.assign({}, issueChartData, starChartData);
    await writeToGen('chart-data', chartData);
}

/**
 * Run the given reports on the given dataset.
 * @param {Object<String, function(Array)>} reports
 * @param {Array} data
 * @return Object
 */
function runReportsOnData(reports, data) {
    const output = {};
    for (const [name, reportFunc] of Object.entries(reports)) {
        output[name] = reportFunc(data);
    }
    return output;
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