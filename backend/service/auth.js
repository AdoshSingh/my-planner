const jwt = require('jsonwebtoken');
require('dotenv').config();

function setUser(user){
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, process.env.SECRET_KEY);

    return token;
}

module.exports = {
    setUser,
}