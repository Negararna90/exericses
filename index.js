const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    const now = new Date();
    const hour = now.getHours();

    let timeOfDay;

    if (hour >= 5 && hour < 12) {
        timeOfDay = 'Morning';
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'Afternoon';
    } else {
        timeOfDay = 'Evening';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`It's ${timeOfDay}!`);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})