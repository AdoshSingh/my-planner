const express = require('express');
const { connectToMongoDB } = require('./connect');
const authRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const {userAuth} = require('./middlewares/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
// app.use(cors());

const corsOptions = {
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
};

app.use(cors(corsOptions));

connectToMongoDB(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err, 'cannot connect'));

app.use('/auth', authRoutes);
app.use('/todo', userAuth, todoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})