const generateData = require('./src/generate-data');

(async function() {
    try {
        await generateData();
    } catch (e) {
        console.error(e);
    }
})();