const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');


router.get('/', userController.getUsers);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/google-auth', userController.googleAuth);
router.post('/logout', userController.logout);
router.delete('/:userId', userController.deleteUser);


module.exports = router;