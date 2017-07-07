var dbConfig = {
    //mysql_database: '',
    mysql_database: 'kfdb',
    //mysql_host: '',
    mysql_host: 'localhost',
    //mysql_user: 'root',
    mysql_user: 'root',
    //mysql_password: '',
    mysql_password: 'root',
    mysql_connectionLimit: 20
}
var category = {
    'all': '全部',
    'h5': 'HTML/CSS',
    'node': 'Node.js',
    'pb': '专利业务',
    'server': '服务器',
    'java': 'JAVA',
    'js': 'javascript',
    'vue': 'Vue.js',
    'db': '数据库',
    'other': '其他'
}
var redisConfig = {
    //host: '',
    host: 'localhost',
    port: '6379',
    ttl: 60 * 60 * 24,
    db: 2,
    pass: ''
}

exports.dbConfig = dbConfig;
exports.category = category;
exports.baseWords = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
exports.noImageUrl = '/images/no-img.jpg';
exports.redisConfig = redisConfig;