const util = require('./util');

module.exports = function(issues) {
    const monthData = {};

    issues.filter(i => !i.is_pr)
        .forEach(issue => {
            const opened = util.timestampToMonth(issue.created_at);
            const closed = issue.closed_at ? util.timestampToMonth(issue.closed_at) : null;
            if (typeof monthData[opened] === 'undefined') {
                monthData[opened] = 0;
            }
            monthData[opened]++;

            if (closed) {
                if (typeof monthData[closed] === 'undefined') {
                    monthData[closed] = 0;
                }
                monthData[closed]--;
            }
        });

    const points = Object.entries(monthData).map(([month, count]) => {
        return {x: month, y: count};
    }).sort(util.xSorter);

    return util.accumulateY(points);
};

