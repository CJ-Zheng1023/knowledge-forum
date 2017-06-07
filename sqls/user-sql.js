module.exports = {
    QUERY_USER_BY_USERNAME: 'select id,user_name,signature,password,mail from user where user_name=?',
    QUERY_TOPIC_BY_USER_ID: 'select id,title,page_view,reply_num from topic where user_id=? order by create_time desc limit 10',
    QUERY_COMMENT_TOPIC_BY_USER_ID: 'select t.id,t.title,t.page_view,t.reply_num from topic t,comment c where c.topic_id=t.id and c.user_id=? order by c.create_time desc limit 10',
    QUERY_ALL_TOPIC_BY_USER_ID: 'select id,title,page_view,reply_num from topic where user_id=? order by create_time desc',
    UPDATE_USER_BY_USERNAME: 'update user set signature=? where user_name=?',
    UPDATE_USER_BY_USERNAME_INCLUDE_PASSWORD: 'update user set signature=?,password=? where user_name=?',
    QUERY_ALL_TOPIC_BY_USER_ID_COUNT: 'select count(1) as count from topic where user_id=?'


}