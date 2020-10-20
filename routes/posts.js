const express = require('express');

const router = express.Router();
const likesController = require('../controllers/posts_controller');
const postsController = require('../controllers/posts_controller');
// console.log('hiting likes router');

router.get('/likes', likesController.like);
router.post('/create', postsController.create);

module.exports = router;