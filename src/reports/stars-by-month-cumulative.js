const util = require('./util');
const starsByMonth = require('./stars-by-month');

module.exports = function(stars) {
    const points = starsByMonth(stars);
    return util.accumulateY(points);
};

