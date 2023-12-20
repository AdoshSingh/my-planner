const express = require('express');
const { connectToMongoDB } = require('./connect'); 
const authRoutes = require('./routes/user');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

connectToMongoDB(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err, 'cannot connect'));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})