import express from 'express';
import path from 'path';

const app = express();

const PORT = 7000 || process.env.PORT;

app.use(express.static('client/public'));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'))
});

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    }
    console.log(`Listening on ${PORT}`);
});