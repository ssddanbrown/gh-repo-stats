const fs = require('fs');
const path = require('path');

const config = require ('../config');
const { Octokit } = require("@octokit/rest");

module.exports = async function fetchIssues() {
    const issues = await getAllIssues();
    return issues.map(cleanIssue);
};

function cleanIssue(issue) {
    return {
        id: issue.id,
        title: issue.title,
        number: issue.number,
        state: issue.state,
        comments: issue.comments,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        closed_at: issue.closed_at,
        is_pr: typeof issue.pull_request === 'object',
    };
}

async function getAllIssues() {
    const cache = path.join(__dirname, '../cache/', 'issues.cache.json');
    if (fs.existsSync(cache)) {
        const data = fs.readFileSync(cache, 'utf8');
        return JSON.parse(data);
    }

    const octokit = new Octokit({
        auth: config.GITHUB_TOKEN,
    });

    const [owner, repo] = config.REPO.split('/');
    const issues = await octokit.paginate(octokit.issues.listForRepo, {
        owner,
        repo,
        state: 'all',
    });

    // TODO - Ignore for actual use
    fs.writeFileSync(cache, JSON.stringify(issues, null, 2), 'utf8');

    return issues;
}