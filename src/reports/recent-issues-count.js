
module.exports = function(days, dateProp = 'created_at', prs = false) {
    const timeFrom = Date.now() - (1000 * 60 * 60 * 24 * days);
    return function(issues) {
        return issues.filter(i => i.is_pr === prs)
            .filter(i => {
                const date = i[dateProp];
                return date && (new Date(date).valueOf() > timeFrom);
            }).length;
    }
};

