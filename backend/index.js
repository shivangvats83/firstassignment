// require('dotenv').config(); 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./router/AuthRouter');
const productrouter = require('./router/productrouter');

require('dotenv').config();
require('./models/db');
const PORT = process.env.PORT || 3000;

app.get('/ping', (_req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/product', productrouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})