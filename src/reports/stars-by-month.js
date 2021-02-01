const util = require('./util');

module.exports = function(stars) {
    const monthData = {};

    stars.forEach(star => {
        const starMonth = util.timestampToMonth(star.starred_at);
        if (typeof monthData[starMonth] === 'undefined') {
            monthData[starMonth] = 0;
        }
        monthData[starMonth]++;
    });

    return Object.entries(monthData).map(([month, count]) => {
        return {x: month, y: count};
    }).sort(util.xSorter);
};

