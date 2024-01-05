const express = require('express');
const {handleAddEvent, handleGetEvent, handleGetMonthEvent, handleDeleteEvent, handleEditEvent} = require('../controllers/event');

const router = express.Router();

router.post('/add-event', handleAddEvent);
router.get('/get-event', handleGetEvent);
router.get('/get-month-event', handleGetMonthEvent);
router.delete('/delete-event', handleDeleteEvent);
router.post('/edit-event', handleEditEvent);

module.exports = router;