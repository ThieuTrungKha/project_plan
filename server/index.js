const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;
app.get('/auth/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(port, (err) => {
    if (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        return
    }
    console.log('Server is running on port http://localhost:' + port);
});