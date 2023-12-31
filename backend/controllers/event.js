const Event = require('../models/event');

const handleAddEvent = async (req, res) => {
    try {
        const {year, month, day, title, description} = req.body;

        const existingEvent = await Event.findOne({year: year, month: month, day: day});
        if(existingEvent){
            res.status(409).json({message: 'An event already exists, you can edit this.'});
            return;
        }

        const newEvent = new Event({
            year: year,
            month: month,
            day: day,
            event:{
                title: title,
                description: description,
            }
        });

        await newEvent.save();

        res.status(201).json({message: 'Event created successfully!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error!'});
    }
}

const handleGetEvent = async (req, res) => {
    try {
        const {year, month, day} = req.body;

        const existingEvent = await Event.findOne({year: year, month: month, day: day});
        if(!existingEvent){
            res.status(404).json({message: 'Event not found!'});
        }

        res.status(200).json({message: 'got event', event: existingEvent});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const handleGetMonthEvent = async (req, res) => {
    try {
        const {year, month} = req.body;

        const existingEvents = await Event.find({year: year, month: month});
        if(!existingEvents){
            res.status(404).json({message: 'No events found!'});
        }

        res.status(200).json({message: 'events retrieved successfully', events: existingEvents});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    handleAddEvent, 
    handleGetEvent,
    handleGetMonthEvent,
}