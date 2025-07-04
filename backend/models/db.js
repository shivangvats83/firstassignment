require('dotenv').config(); 

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
        process.exit(1);
    })
// require('dotenv').config();
// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log(' MongoDB Connected...');
//   })
//   .catch((err) => {
//     console.error(' MongoDB Connection Error:', err); // Log the error properly
//     process.exit(1); // Stop the app if DB connection fails
//   });
