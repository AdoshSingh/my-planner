const User = require('../models/user');
const Todo = require('../models/todo');

const getAllTodos = async (req, res) => {
    try {
        const decodedToken = req.decodedToken;
        const userId = decodedToken._id;

        const userTodos = await Todo.find({ user: userId });

        return res.status(200).json({ message: 'Got all todos', todos: userTodos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleAddTodo = async (req, res) => {
    try {
        const decodedToken = req.decodedToken;
        const { title, description } = req.body;
        const userEmail = decodedToken.email;

        const existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exists!' });
        }

        const newTodoData = {
            title: title,
            done: false,
            user: existingUser,
        };

        if (description) {
            newTodoData.description = description;
        }

        const newTodo = new Todo(newTodoData);

        await newTodo.save();

        res.status(201).json({ message: 'Todo added successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleStatusTodo = async (req, res) => {
    try {
        const { taskId } = req.body;

        const currentTodo = await Todo.findOne({ _id: taskId });

        if (!currentTodo) {
            console.log('Todo not found');
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        const updatedDoneStatus = !currentTodo.done;
        const result = await Todo.updateOne({ _id: taskId }, { $set: { done: updatedDoneStatus } });

        res.status(200).json({ message: 'Status changed successfully!', status: updatedDoneStatus });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleDeleteTodo = async (req, res) => {
    try {
        const { todoId } = req.body;
        const result = await Todo.findByIdAndDelete(todoId);
        if (result) {
            res.status(200).json({ message: 'Todo deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

const handleEditTodo = async (req, res) => {
    try {
        
        const {id, title, description} = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {title: title, description: description, done: false},
            {new: true}
        );

        if(updatedTodo){
            res.status(201).json({message: 'Todo updated successfully'});
        }
        else {
            res.status(400).json({message: 'error updating'});
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error!'});
    }
}

module.exports = {
    getAllTodos,
    handleAddTodo,
    handleStatusTodo,
    handleDeleteTodo,
    handleEditTodo,
}