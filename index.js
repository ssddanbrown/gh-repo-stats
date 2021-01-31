const config = require ('./config');
const fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth: config.GITHUB_TOKEN,
});

const [owner, repo] = config.REPO.split('/');


(async function() {

    const genDir = path.join(__dirname, './public/gen');

    const issues = await getAllIssues();
    const cleanIssues = issues.map(cleanIssue);
    fs.writeFileSync(path.join(genDir, 'issues.json'), JSON.stringify(cleanIssues), 'utf8');

    return;

})();

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
    };
}

async function getAllIssues() {
    const cache = path.join(__dirname, 'issues.cache.json');
    if (fs.existsSync(cache)) {
        const data = fs.readFileSync(cache, 'utf8');
        return JSON.parse(data);
    }

    const issues = await octokit.paginate(octokit.issues.listForRepo, {
        owner,
        repo,
        state: 'all',
      });

    // TODO - Ignore for actual use
    fs.writeFileSync(cache, JSON.stringify(issues, null, 2), 'utf8');

    return issues;
}