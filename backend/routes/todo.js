const express = require('express');
const {getAllTodos, handleAddTodo, handleStatusTodo, handleDeleteTodo, handleEditTodo} = require('../controllers/todo');

const router = express.Router();

router.get('/get-todos', getAllTodos);
router.post('/add-todo', handleAddTodo);
router.post('/change-status-todo', handleStatusTodo);
router.delete('/delete-todo', handleDeleteTodo);
router.post('/edit-todo', handleEditTodo);

module.exports = router;