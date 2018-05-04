var express = require('express');
var tokenController = require('./api/v1/token');
var profileController = require('./api/v1/profile');
var router = express.Router();

//token，用于上传七牛云服务器

router.get('/token', tokenController.getToken);

//解决跨域问题
router.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
//调用简历api
router.get('/document', profileController.getDocument);
router.get('/company', profileController.getCompany);
router.get('/experience', profileController.getExperience);
router.get('/skill', profileController.getSkill);


module.exports = router;