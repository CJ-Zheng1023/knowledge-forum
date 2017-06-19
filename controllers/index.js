var getSqlConnection = require('../utils/dataBaseConnection');
var Promise = require('bluebird');
var sql = require('../sqls/index-sql');
var noImageUrl = require('../config').noImageUrl;

module.exports = {
    openLoginPage: function(req, res, next){
        res.render("login", {msg: req.flash("msg")});
    },
    openRegisterPage: function(req, res, next){
        res.render("register", {msg: req.flash("msg")});
    },
    showIndex: function(req, res, next){
        var data = {};
        var limit=10;
        var page=req.query.page?req.query.page:1;
        if(req.params.name){
            data.curCategory = req.params.name;
        }else{
            data.curCategory = "all";
        }
        var s=sql.SELECT_TOPIC_LIST,ss=sql.SELECT_TOPIC_LIST_COUNT,params=[];
        if(data.curCategory!="all"){
            s=sql.SELECT_TOPIC_LIST_BY_CATEGORY;
            ss=sql.SELECT_TOPIC_LIST_BY_CATEGORY_COUNT;
            params.push(data.curCategory);
        }
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(s+" limit "+(page-1)*limit+","+limit, params).then(function(rows){
                var topicList = [];
                rows.forEach(function(el){
                    var topic={
                        id: el.id,
                        title: el.title,
                        pageView: el.page_view,
                        replyNum: el.reply_num,
                        userName: el.user_name,
                        photo: (el.photo==""||el.photo==null?noImageUrl:el.photo)
                    };
                    if(el.category){
                        topic.category=el.category;
                    }
                    topicList.push(topic);
                })
                data.topicList = topicList;
            }).then(function(){
                return conn.query(sql.SELECT_STATISTIC);
            }).then(function(rows){
                var statistic = {
                    userCount: rows[0].totalcommunity,
                    topicCount: rows[0].totaltposts,
                    commentCount: rows[0].totalreplies
                }
                data.statistic = statistic;
            }).then(function(){
                return conn.query(ss, params);
            }).then(function(rows){
                data.pagination={
                    limit: limit,
                    curPage: page,
                    total: rows[0].count
                }
                res.render('index', data);
            }).catch(function(errors){
                console.log(errors);
            })
        })
    },
    openRegisterSuccess: function(req, res, next){
        res.render('register-success');
    }
}