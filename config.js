var dbConfig = {
    mysql_database: '',
    mysql_host: '',
    mysql_port: '',
    mysql_user: '',
    mysql_password: '',
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

exports.dbConfig = dbConfig;
exports.category = category;
exports.baseWords = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';