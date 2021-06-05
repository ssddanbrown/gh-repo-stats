const util = require('./util');

module.exports = function(issues) {
    const points = issues.filter(i => !i.is_pr && i.closed_at)
        .map(issue => {
            return {
                x: util.timestampToMonth(issue.closed_at),
                y: 1
            };
        });

    return util.fillMonthGaps(util.sumYOnSameX(points).sort(util.xSorter));
};

