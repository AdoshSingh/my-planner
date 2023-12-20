const jwt = require('jsonwebtoken');

const secret = 'epriyer@420';

function setUser(user){
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, secret);

    return token;
}

module.exports = {
    setUser,
}