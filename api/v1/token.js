var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = '1caYPYwqT2b07uIagKVXet8Ps0JER-pPxLe6pE9e';
qiniu.conf.SECRET_KEY = 'hGEero3cuNPgfMH7R-C7CPWEJggXHBpLsYpIAZ1_';
var BUCKET_NAME = "afterwin";
module.exports = {
    getToken: function(req, res, next){
        var mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
        var putPolicy = new qiniu.rs.PutPolicy(BUCKET_NAME);
        res.json({
            "uptoken": putPolicy.token(mac)
        })
    }
}