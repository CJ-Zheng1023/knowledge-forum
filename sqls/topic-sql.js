module.exports = {
    SELECT_TOPIC: 'select c.id,c.title,c.create_time,c.content,c.page_view,c.reply_num,c.praise,c.user_id,u.user_name,u.signature,c.category,u.photo from topic c,user u where c.id= ? and u.id=c.user_id',
    SELECT_COMMENT: 'select c.id,c.content,c.user_id,c.create_time,u.user_name,u.photo from comment c,user u where u.Id=c.user_id and c.topic_id=? order by c.create_time desc',
    SELECT_OTHER_TOPIC:'select id,title from topic where user_id=? and id <> ?',
    INSERT_COMMENT: 'insert into comment(id,content,topic_id,user_id,create_time) values(?,?,?,?,?)',
    INSERT_TOPIC: 'insert into topic(id,title,create_time,content,user_id,category) values(?,?,?,?,?,?)',
    SELECT_TOPIC_FOR_EDIT: 'select id,title,content,category from topic where id=? and user_id=?',
    UPDATE_TOPIC: 'update topic set title=?,content=?,category=? where id=? and user_id=?',
    UPDATE_TOPIC_PAGEVIEW: 'update topic set page_view=page_view+1 where id=?'
}