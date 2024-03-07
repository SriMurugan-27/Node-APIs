const { Task, validateTask } = require('../models/task');

const getAlltasks = async (req, res) => {
    const tasks = await Task.find();
    if(!tasks){
        return res.status(400).send('There is no task to complete!...');
    }
    res.send(tasks);
};

const getTask = async (req, res) => {
    const tasks = await Task.find({ _id: req.params.id });
    if(!tasks){
        return res.status(404).send('No such task exists');
    }
    res.send(tasks);
};

const createTask = async (req, res) => {
    const { error } = validateTask(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let task = new Task({ 
        name: req.body.name,
        completed: req.body.completed
    });
    task = await task.save();
    res.send(task);
};

const updateTask = async (req, res) => {
    const { error } = validateTask(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const task = await Task.findByIdAndUpdate({ _id: req.params.id },{ $set: {
        name: req.body.name,
        completed: req.body.completed
    }},{ new: true });
    res.send(task);  
};

const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(400).send('No such task exists');
    }
    res.send(task);
};

module.exports.tasks = {
    getAlltasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};