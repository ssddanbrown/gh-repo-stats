const fs = require('fs');
const path = require('path');

const config = require ('../config');
const { Octokit } = require("@octokit/rest");
const isDev = (process.env.NODE_ENV || '').startsWith('dev');

const octokit = new Octokit({
    auth: config.GITHUB_TOKEN,
});
const [owner, repo] = config.REPO.split('/');

async function issues() {
    const issues = await getAllIssues();
    return issues.map(cleanIssue);
}

async function stars() {
    const stars = await getAllStars();
    return stars.map(cleanStar);
}

async function usingCache(key, callback) {
    const cache = path.join(__dirname, '../cache/', `${key}.cache.json`);
    if (isDev && fs.existsSync(cache)) {
        const data = fs.readFileSync(cache, 'utf8');
        return JSON.parse(data);
    }

    const data = await callback();
    if (isDev) {
        fs.writeFileSync(cache, JSON.stringify(data, null, 2), 'utf8');
    }

    return data;
}

async function getAllStars() {
    return await usingCache('stars', async () => {
        return await octokit.paginate(octokit.activity.listStargazersForRepo, {
            owner,
            repo,
            mediaType: {
                format: "star",
            },
        });
    });
}

async function getAllIssues() {
    return await usingCache('issues', async () => {
        return await octokit.paginate(octokit.issues.listForRepo, {
            owner,
            repo,
            state: 'all',
        });
    });
}

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

function cleanStar({user, starred_at}) {
    return {
        starred_at,
        login: user.login,
        user_id: user.id,
    };
}

module.exports = {
    issues,
    stars,
}