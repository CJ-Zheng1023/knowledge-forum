var getSqlConnection = require('../utils/dataBaseConnection');
var sql = require('../sqls/topic-sql.js');
var uuid = require('../utils/UUIDUtil');
var config = require('../config');
var Promise = require('bluebird');
var noImageUrl = require('../config').noImageUrl;
var dateUtil = require('../utils/DateUtil');

var NO_RESOURCE = "no resource";


module.exports = {
    showTopicDetail: function(req, res,next){
        var id=req.params.id;
        var data = {};
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.SELECT_TOPIC, [id]).then(function(rows){
                if(rows.length){
                    var temp = rows[0];
                    var topic={};
                    topic.id = temp.id;
                    topic.title = temp.title;
                    topic.createTime = temp.create_time;
                    topic.content = temp.content;
                    topic.pageView = temp.page_view;
                    topic.replyNum = temp.reply_num;
                    topic.praise = temp.praise;
                    topic.userId = temp.user_id;
                    topic.userName=temp.user_name;
                    topic.signature=temp.signature;
                    topic.category=temp.category;
                    topic.userPhoto=(temp.photo==""||temp.photo==null?noImageUrl:temp.photo);
                    data.topic = topic;
                    return topic;
                }else{
                    res.status(404)
                    res.render('404');
                    throw new Error(NO_RESOURCE);
                }
            }).then(function(topic){
                return conn.query(sql. SELECT_OTHER_TOPIC, [topic.userId, topic.id]);
            }).then(function(rows){
                var otherTopicList = [];
                rows.forEach(function(el){
                    var othertopic={};
                    othertopic.id=el.id;
                    othertopic.title=el.title;
                    otherTopicList.push(othertopic);
                })
                data.otherTopicList = otherTopicList;
            }).then(function(){
                return conn.query(sql.SELECT_COMMENT,[id]);
            }).then(function(rows){
                var commentList = [];
                rows.forEach(function(el){
                    var comment={};
                    comment.content=el.content;
                    comment.topicId=el.topic_id;
                    comment.createTime=el.create_time;
                    comment.userName=el.user_name;
                    comment.userPhoto=(el.photo==""||el.photo==null?noImageUrl:el.photo);
                    commentList.push(comment);
                })
                data.commentList = commentList;
            }).then(function(){
                return conn.query(sql.UPDATE_TOPIC_PAGEVIEW, [id]);
            }).then(function(){
                res.render('detail', data);
            }).catch(function(errors){
                if(errors.message == NO_RESOURCE){

                }else{
                    console.log(errors);
                }
            })
        })
    },
    addComment: function(req, res, next){
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.INSERT_COMMENT, [uuid.generateUUID(),req.body.content,req.body.topicId,req.user.id,dateUtil.format('yyyy-MM-dd hh:mm:ss')]).then(function(){
                res.redirect('/topic/show/'+req.body.topicId);
            }).catch(function(errors){
                console.log(errors);
            })
        })
    },
    openCreateTopicPage: function(req, res, next){
        if(req.isAuthenticated()){
            var data={};
            var op={};
            for(p in config.category){
                op[p]=config.category[p];
            }
            delete op.all;
            data.op=op;
            res.render("add-topic", data);
        }else{
            res.redirect('/login');
        }

    },
    addTopic: function(req, res, next){
        var id=uuid.generateUUID();
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.INSERT_TOPIC,[id, req.body.title, dateUtil.format('yyyy-MM-dd hh:mm:ss'), req.body.content, req.user.id, req.body.category]).then(function(){
                res.redirect('/topic/show/'+id);
            }).catch(function(errors){
                console.log(errors);
            })
        })
    },
    openEditTopicPage: function(req, res, next){
        if(req.isAuthenticated()){
            Promise.using(getSqlConnection(), function(conn){
                return conn.query(sql.SELECT_TOPIC_FOR_EDIT,[req.params.id, req.user.id]).then(function(rows){
                    if(rows.length){
                        var temp = rows[0];
                        var topic = {
                            id: temp.id,
                            title: temp.title,
                            content: temp.content,
                            category: temp.category
                        }
                        var data={};
                        var op={};
                        for(p in config.category){
                            op[p]=config.category[p];
                        }
                        delete op.all;
                        data.op=op;
                        data.topic=topic;
                        res.render('add-topic', data);
                    }else{
                        res.status(404);
                        res.render('404');
                    }
                }).catch(function(errors){
                    console.log(errors);
                })
            })
        }else{
            res.redirect('/login');
        }
    },
    editTopic: function(req, res, next){
        Promise.using(getSqlConnection(), function(conn){
            return conn.query(sql.UPDATE_TOPIC, [req.body.title, req.body.content, req.body.category, req.params.id, req.user.id]).then(function(){
                res.redirect('/topic/show/'+req.params.id);
            }).catch(function(errors){
                console.log(errors);
            })
        })
    }
}