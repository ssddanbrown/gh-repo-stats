
function contextFor(id) {
    return document.getElementById(id).getContext('2d');
}

const timeScales = {
    x: {
        type: 'time',
        time: {
            unit: 'quarter'
        }
    }
};

new Chart(contextFor('issues-all-time'), {
    type: 'bar',
    data: {
        datasets: [
            {label: 'opened', data: window.chart_data.issues_opened_by_month, backgroundColor: 'rgba(0, 150, 0, 0.2)', borderColor: 'rgba(0, 150, 0, 0.8)', borderWidth: 1},
            {label: 'closed', data: window.chart_data.issues_closed_by_month, backgroundColor: 'rgba(150, 0, 0, 0.2)', borderColor: 'rgba(150, 0, 0, 0.8)', borderWidth: 1},
        ]
    },
    options: {
        maintainAspectRatio: false,
        scales: timeScales,
    }
});

new Chart(contextFor('issues-over-time'), {
    type: 'line',
    data: {
        datasets: [
            {label: 'Open Issues', data: window.chart_data.issues_opened_by_month_cumulative, backgroundColor: 'rgba(0, 0, 150, 0.2)', borderColor: 'rgba(0, 0, 150, 0.8)', borderWidth: 1, fill: 'start', tension: 0.3},
        ]
    },
    options: {
        maintainAspectRatio: false,
        scales: timeScales,
    }
});


new Chart(contextFor('recent-issue-open-close'), {
    type: 'bar',
    data: {
        labels: ['30 day', '90 day'],
        datasets: [
            {label: 'opened', data: [
                window.chart_data.issues_created_30_days,
                window.chart_data.issues_created_90_days,
                ], backgroundColor: 'rgba(0, 150, 0, 0.2)', borderColor: 'rgba(0, 150, 0, 0.8)', borderWidth: 1},
            {label: 'closed', data: [
                    window.chart_data.issues_closed_30_days,
                    window.chart_data.issues_closed_90_days,
                ], backgroundColor: 'rgba(150, 0, 0, 0.2)', borderColor: 'rgba(150, 0, 0, 0.8)', borderWidth: 1},
        ]
    },
    options: {
        maintainAspectRatio: false,
    }
});

new Chart(contextFor('recent-pr-open-close'), {
    type: 'bar',
    data: {
        labels: ['30 day', '90 day'],
        datasets: [
            {label: 'opened', data: [
                    window.chart_data.prs_created_30_days,
                    window.chart_data.prs_created_90_days,
                ], backgroundColor: 'rgba(0, 150, 0, 0.2)', borderColor: 'rgba(0, 150, 0, 0.8)', borderWidth: 1},
            {label: 'closed', data: [
                    window.chart_data.prs_closed_30_days,
                    window.chart_data.prs_closed_90_days,
                ], backgroundColor: 'rgba(150, 0, 0, 0.2)', borderColor: 'rgba(150, 0, 0, 0.8)', borderWidth: 1},
        ]
    },
    options: {
        maintainAspectRatio: false,
    }
});