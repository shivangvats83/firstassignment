require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


const AuthRouter = require('./router/AuthRouter');
const ProductRouter = require('./router/productrouter');
const PaymentRouter = require('./router/PaymentRouter'); 


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


app.use(cors());
app.use(express.json());


app.get('/ping', (_req, res) => res.send('PONG'));
app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);
app.use('/payment', PaymentRouter); 


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
