const express = require('express');
const {handleAddEvent, handleGetEvent, handleGetMonthEvent, handleDeleteEvent} = require('../controllers/event');

const router = express.Router();

router.post('/add-event', handleAddEvent);
router.get('/get-event', handleGetEvent);
router.get('/get-month-event', handleGetMonthEvent);
router.delete('/delete-event', handleDeleteEvent);

module.exports = router;