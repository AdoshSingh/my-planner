const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    event:{
        title: String,
        description: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;