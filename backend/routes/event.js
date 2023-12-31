const express = require('express');
const {handleAddEvent, handleGetEvent, handleGetMonthEvent} = require('../controllers/event');

const router = express.Router();

router.post('/add-event', handleAddEvent);
router.get('/get-event', handleGetEvent);
router.get('/get-month-event', handleGetMonthEvent);

module.exports = router;