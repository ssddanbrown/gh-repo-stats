const util = require('./util');

module.exports = function(issues) {
    const points = issues.filter(i => !i.is_pr)
        .map(issue => {
            return {
                x: util.timestampToMonth(issue.created_at),
                y: 1
            };
        });

    return util.sumYOnSameX(points).sort(util.xSorter);
};

