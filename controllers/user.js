var getSqlConnection = require('../utils/dataBaseConnection');
var sql = require('../sqls/user-sql.js');

module.exports = {
    doLogout: function(req, res){
        req.logout();
        res.redirect('/login');
    },
    isLogin: function(req, res, next){
        if(!req.isAuthenticated()){
            res.redirect("/login");
            return false;
        }
        return next();
    },
    openUserPage: function(req, res, next){
        var data={};
        dbUtils.execute(sql.QUERY_USER_BY_USERNAME, [req.params.username], function(err, results){
            if(err){
                return next(err);
            }
            if(JSON.parse(results).length){
                var temp = JSON.parse(results)[0];
                var personal = {
                    id: temp.id,
                    userName: temp.user_name,
                    signature: temp.signature
                };
                data.personal=personal;
                dbUtils.execute(sql.QUERY_TOPIC_BY_USER_ID,[personal.id], function(err, results){
                    if(err){
                        return next(err);
                    }
                    var ownTopicList =[];
                    JSON.parse(results).forEach(function(el){
                        ownTopicList.push({
                            id: el.id,
                            title: el.title,
                            pageView: el.page_view,
                            replyNum: el.reply_num
                        })
                    })
                    data.ownTopicList=ownTopicList;
                    dbUtils.execute(sql.QUERY_COMMENT_TOPIC_BY_USER_ID,[personal.id],function(err, results){
                        if(err){
                            return next(err);
                        }
                        var commentTopicList=[];
                        JSON.parse(results).forEach(function(el){
                            commentTopicList.push({
                                id: el.id,
                                title: el.title,
                                pageView: el.page_view,
                                replyNum: el.reply_num
                            })
                        })
                        data.commentTopicList=commentTopicList;
                        res.render("personal", data);
                    })
                })
            }else{
                res.status(404);
                res.render('404');
            }

        })
    },
    openOwnTopic: function(req, res, next){
        var data={};
        var page=req.query.page?req.query.page:1;
        var limit=10;
        dbUtils.execute(sql.QUERY_USER_BY_USERNAME, [req.params.username], function(err, results){
            if(err){
                return next(err);
            }
            var temp = JSON.parse(results)[0];
            var personal = {
                id: temp.id,
                userName: temp.user_name,
                signature: temp.signature
            };
            data.personal=personal;
            dbUtils.execute(sql.QUERY_ALL_TOPIC_BY_USER_ID+" limit "+(page-1)*limit+","+limit,[personal.id], function(err, results){
                if(err){
                    return next(err);
                }
                var ownTopicList =[];
                JSON.parse(results).forEach(function(el){
                    ownTopicList.push({
                        id: el.id,
                        title: el.title,
                        pageView: el.page_view,
                        replyNum: el.reply_num
                    })
                })
                data.ownTopicList=ownTopicList;
                dbUtils.execute(sql.QUERY_ALL_TOPIC_BY_USER_ID_COUNT,[personal.id],function(err,results){
                    if(err){
                        return next(err);
                    }
                    data.pagination={
                        limit: limit,
                        curPage: page,
                        total: JSON.parse(results)[0].count
                    }
                    res.render("own-topic", data);
                })
            })
        })
    },
    openSettingPage: function(req, res, next){
        var username=req.params.username;
        var data = {};
        dbUtils.execute(sql.QUERY_USER_BY_USERNAME,[username], function(err, results){
            if(err){
                return next(err);
            }
            if(JSON.parse(results).length){
                var temp = JSON.parse(results)[0];
                var u={};
                u.id = temp.id;
                u.username=temp.user_name;
                u.signature=temp.signature;
                u.password=temp.password;
                u.mail=temp.mail;
                data.u = u;
                console.log(data)
                res.render('setting', data);
            }else{
                res.status(404)
                res.render('404');
            }
        })
    },
    saveSetting: function(req, res, next){
        var s="", params=[];
        if(req.body.password){
            s=sql.UPDATE_USER_BY_USERNAME_INCLUDE_PASSWORD;
            params=[req.body.signature,req.body.password,req.params.username];
        }else{
            s=sql.UPDATE_USER_BY_USERNAME;
            params=[req.body.signature,req.params.username];
        }
        dbUtils.execute(s, params, function(err,results){
            if(err){
                return next(err);
            }
            res.redirect('/user/'+req.params.username);
        })

    }
}