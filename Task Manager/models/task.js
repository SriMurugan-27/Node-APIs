const mongoose = require('mongoose');
const Joi  = require('joi');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task){
    const Schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        completed: Joi.boolean()
    });

    return Schema.validate(task);
};

module.exports.Task = Task;
module.exports.validateTask = validateTask;