require('dotenv').config(); // <-- Add this line

const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
// mongoose.connect(mongo_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect(process.env.MONGO_CONN);

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })