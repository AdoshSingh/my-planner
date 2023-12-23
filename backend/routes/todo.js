const express = require('express');
const {getAllTodos, handleAddTodo, handleStatusTodo} = require('../controllers/todo');

const router = express.Router();

router.get('/get-todos', getAllTodos);
router.post('/add-todo', handleAddTodo);
router.post('/change-status-todo', handleStatusTodo);

module.exports = router;