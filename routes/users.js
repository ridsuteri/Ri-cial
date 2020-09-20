const express=require('express');

const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);

module.exports=router;