const User = require('../models/user');
const bcrypt = require('bcrypt');
const {setUser} = require('../service/auth');

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPass,
        })
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const handleUserLogin = async (req, res) => {
    try {

        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const compPass = user.password;

        const match = await bcrypt.compare(password, compPass);

        if(match){
            const token = setUser(user);
            res.cookie('token', token);

            return res.status(201).json({message: 'User successfully logged in!'});
        }
        else{
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
}