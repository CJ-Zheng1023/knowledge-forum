var dbConfig = {
    mysql_database: 'kfdb-test',
    mysql_host: '47.93.1.25',
    mysql_port: '3306',
    mysql_user: 'root',
    mysql_password: '1qaz2wsx',
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