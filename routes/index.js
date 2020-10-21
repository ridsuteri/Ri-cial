const express=require('express');

const router=express.Router();

// exported controlers from controllers directory
const homeController=require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments', require('./comments'));

module.exports=router;