const express = require('express');
const router = express.Router();
const { jobs }= require('../controller/job');

router.route('/').get(jobs.getAllJobs).post(jobs.createJob);
router.route('/:id').patch(jobs.updateJob).delete(jobs.deleteJob).get(jobs.getJob);

module.exports = router;