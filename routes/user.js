var express = require('express');
var router = express.Router();
var C = require('../controllers/user.js')


//是否登陆
router.use(C.isLogin);
//跳转个人中心
router.get('/:username', C.openUserPage)

//跳转用户信息设置
router.get('/:username/setting', C.openSettingPage);

//退出
router.get('/:username/logout', C.doLogout);
//展示用户发布帖子集合
router.get('/:username/topics', C.openOwnTopic);
//保存用户信息配置
router.post('/:username/setting', C.saveSetting);
module.exports = router;