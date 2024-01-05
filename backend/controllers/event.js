const Event = require('../models/event');
const User = require('../models/user');

const handleAddEvent = async (req, res) => {
    try {
        const { year, month, day, title, description } = req.body;
        const userInfo = req.decodedToken;

        const existingUser = await User.findOne({ email: userInfo.email });

        const existingEvent = await Event.findOne({ year: year, month: month, day: day, user: existingUser });
        if (existingEvent) {
            res.status(409).json({ message: 'An event already exists, you can edit this.' });
            return;
        }

        const newEvent = new Event({
            year: year,
            month: month,
            day: day,
            event: {
                title: title,
                description: description,
            },
            user: existingUser,
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event created successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleGetEvent = async (req, res) => {
    try {
        const { year, month, day } = req.query;
        const userInfo = req.decodedToken;

        const existingUser = await User.findOne({ email: userInfo.email });

        const existingEvent = await Event.findOne({ year: year, month: month, day: day, user: existingUser });
        if (!existingEvent) {
            res.status(404).json({ message: 'Event not found!' });
            return;
        }

        res.status(200).json({ message: 'got event', event: existingEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleGetMonthEvent = async (req, res) => {
    try {
        const { year, month } = req.query;
        const userInfo = req.decodedToken;

        const existingUser = await User.findOne({ email: userInfo.email });

        const existingEvents = await Event.find({ year: year, month: month, user: existingUser });
        if (!existingEvents) {
            res.status(404).json({ message: 'No events found!' });
            return;
        }

        res.status(200).json({ message: 'events retrieved successfully', events: existingEvents });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleDeleteEvent = async (req, res) => {
    try {
        const { year, month, day } = req.body;
        const userInfo = req.decodedToken;

        const existingUser = await User.findOne({ email: userInfo.email });

        const result = await Event.findOneAndDelete({ year: year, month: month, day: day, user: existingUser });

        if (result) {
            res.status(200).json({ message: 'Event deleted successfully!' });
        }
        else {
            res.status(404).json({ message: 'Event not found!' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleEditEvent = async (req, res) => {
    try {
        const { year, month, day, title, description } = req.body;
        const userInfo = req.decodedToken;

        const existingUser = await User.findOne({ email: userInfo.email });

        const existingEvent = await Event.findOneAndUpdate(
            { year: year, month: month, day: day, user: existingUser },
            { $set: { 'event.title': title, 'event.description': description } },
            { new: true },
        );

        if(!existingEvent){
            res.status(404).json({message: 'Event not found!'});
            return;
        }

        res.status(200).json({message: 'Event edited successfully', updated: existingEvent});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = {
    handleAddEvent,
    handleGetEvent,
    handleGetMonthEvent,
    handleDeleteEvent,
    handleEditEvent,
}