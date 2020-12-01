const express = require('express');

const router = express.Router();
const LikesController = require('../controllers/likes_controller');

router.post('/toggle', LikesController.toggleLike);

module.exports = router;