var express = require('express');
var tokenController = require('./api/v1/token');
var router = express.Router();

//token，用于上传七牛云服务器

router.get('/token', tokenController.getToken);

module.exports = router;