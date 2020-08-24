const express = require('express');

const app = express();

app.use(express.static('./dist/sachhay-front-end'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/sachhay-front-end/'}),
);

app.listen(process.env.PORT || 8080);
