const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

// Create a project + auto-generate requirements
router.post('/', projectController.createProject);

module.exports = router;
