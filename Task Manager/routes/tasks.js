const express = require('express');
const router = express.Router();
const { tasks } = require('../controllers/controlTask');

router.route('/').get(tasks.getAlltasks).post(tasks.createTask);
router.route('/:id').get(tasks.getTask).patch(tasks.updateTask).delete(tasks.deleteTask);

module.exports = router;