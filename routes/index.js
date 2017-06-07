var express = require('express');
var router = express.Router();
var C = require('../controllers/index.js');


//首页
router.get('/', C.showIndex);
//首页分类切换
router.get('/category/:name', C.showIndex);
//跳转登录页面
router.get('/login', C.openLoginPage)
//跳转注册页面
router.get('/register', C.openRegisterPage)
//跳转注册成功页面
router.get('/register-success', C.openRegisterSuccess);

module.exports = router;