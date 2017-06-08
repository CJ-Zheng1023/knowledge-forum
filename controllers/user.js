var getSqlConnection = require('../utils/dataBaseConnection');
var sql = require('../sqls/user-sql.js');
var Promise = require('bluebird');
var NO_RESOURCE = "no resource";

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
        var id;
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.QUERY_USER_BY_USERNAME, [req.params.username]).then(function(rows){
                if(rows.length){
                    var temp = rows[0];
                    var personal = {
                        id: temp.id,
                        userName: temp.user_name,
                        signature: temp.signature
                    };
                    data.personal=personal;
                    id = personal.id;
                }else{
                    res.status(404);
                    res.render('404');
                    throw new Error(NO_RESOURCE);
                }
            }).then(function(){
                return conn.query(sql.QUERY_TOPIC_BY_USER_ID, [id])
            }).then(function(rows){
                var ownTopicList =[];
                rows.forEach(function(el){
                    ownTopicList.push({
                        id: el.id,
                        title: el.title,
                        pageView: el.page_view,
                        replyNum: el.reply_num
                    })
                })
                data.ownTopicList=ownTopicList;
            }).then(function(){
                return conn.query(sql.QUERY_COMMENT_TOPIC_BY_USER_ID, [id]);
            }).then(function(rows){
                var commentTopicList=[];
                rows.forEach(function(el){
                    commentTopicList.push({
                        id: el.id,
                        title: el.title,
                        pageView: el.page_view,
                        replyNum: el.reply_num
                    })
                })
                data.commentTopicList=commentTopicList;
                res.render("personal", data);
            }).catch(function(errors){
                if(errors.message == NO_RESOURCE){

                }else{
                    console.log(errors);
                }
            })
        })
    },
    openOwnTopic: function(req, res, next){
        var data={};
        var page=req.query.page?req.query.page:1;
        var limit=10;
        var id;
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.QUERY_USER_BY_USERNAME, [req.params.username]).then(function(rows){
                var temp = rows[0];
                var personal = {
                    id: temp.id,
                    userName: temp.user_name,
                    signature: temp.signature
                };
                data.personal=personal;
                id = personal.id;
            }).then(function(){
                return conn.query(sql.QUERY_ALL_TOPIC_BY_USER_ID+" limit "+(page-1)*limit+","+limit, [id]);
            }).then(function(rows){
                var ownTopicList =[];
                rows.forEach(function(el){
                    ownTopicList.push({
                        id: el.id,
                        title: el.title,
                        pageView: el.page_view,
                        replyNum: el.reply_num
                    })
                })
                data.ownTopicList=ownTopicList;
            }).then(function(){
                return conn.query(sql.QUERY_ALL_TOPIC_BY_USER_ID_COUNT,[id]);
            }).then(function(rows){
                data.pagination={
                    limit: limit,
                    curPage: page,
                    total: rows[0].count
                }
                res.render("own-topic", data);
            }).catch(function(errors){
                console.log(errors);
            })
        })
    },
    openSettingPage: function(req, res, next){
        var username=req.params.username;
        var data = {};
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.QUERY_USER_BY_USERNAME, [username]).then(function(rows){
                if(rows.length){
                    var temp = rows[0];
                    var u={};
                    u.id = temp.id;
                    u.username=temp.user_name;
                    u.signature=temp.signature;
                    u.password=temp.password;
                    u.mail=temp.mail;
                    data.u = u;
                    res.render('setting', data);
                }else{
                    res.status(404)
                    res.render('404');
                }
            }).catch(function(errors){
                console.log(errors);
            })
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
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(s, params).then(function(){
                res.redirect('/user/'+req.params.username);
            })
        })
    }
}