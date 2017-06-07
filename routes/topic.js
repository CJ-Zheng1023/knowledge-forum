var express = require('express');
var router = express.Router();
var C = require('../controllers/topic.js');

//主题详细信息
router.get('/show/:id', C.showTopicDetail);
//跳转新增主题页面
router.get('/create', C.openCreateTopicPage);
//新增主题
router.post('/create', C.addTopic);
//跳转修改主题页面
router.get('/edit/:id', C.openEditTopicPage);
//修改主题
router.post('/edit/:id', C.editTopic);
//新增回复
router.post('/addComment', C.addComment)
module.exports = router;