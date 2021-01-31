/**
 * Convert the given timestamp to a month date.
 * @param {String} date
 */
function timestampToMonth(date) {
    const parts = date.split('-');
    return parts[0] + '-' + parts[1] + '-01';
}

/**
 * Sum the y values of the given data where the
 * x values are the same.
 * @param {Array<{x: String, y: Number}>}data
 * @returns {Array<{x: String, y: Number}>}
 */
function sumYOnSameX(data) {
    const results = {};
    for (const {x, y} of data) {
        if (typeof results[x] === "undefined") {
            results[x] = {x, y: 0};
        }
        results[x].y += y;
    }
    return Object.values(results);
}

/**
 * Sorter function that sorts by the b property of the values.
 * @param a {{x: String, y: Number}}
 * @param b {{x: String, y: Number}}
 * @return Number
 */
function xSorter(a, b) {
    if (a.x === b.x) return 0;
    if (a.x > b.x) return 1;
    return -1;
}


/**
 * Accumulate the Y values, Data must be pre-sorted
 * @param {{x: String, y: Number}}data
 */
function accumulateY(data) {
    let lastY = 0;
    return data.map(({x,y}) => {
        lastY += y;
        return {x, y: lastY};
    });
}

module.exports = {
    sumYOnSameX,
    xSorter,
    timestampToMonth,
    accumulateY,
}