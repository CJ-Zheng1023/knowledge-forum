// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
// load up the user model
var getSqlConnection = require('../utils/dataBaseConnection');
var Promise = require('bluebird');
var uuid = require('../utils/UUIDUtil');
// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Promise.using(getSqlConnection(), function(conn){
            return conn.query('SELECT * FROM user WHERE id = ? ', [id]).then(function(rows){
                var user = {
                    id: rows[0].Id,
                    userName: rows[0].user_name
                }
                return done(null, user);
            })
        })
    });

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            Promise.using(getSqlConnection(), function(conn){
                return conn.query('SELECT * FROM user WHERE user_name = ? ', [username]).then(function(rows){
                    if(!rows.length){
                        return done(null, false, req.flash('msg', '不存在该用户名。'));
                    }
                    if(!bcrypt.compareSync(password, rows[0].password)){
                        return done(null, false, req.flash('msg', '输入的密码有误。'));
                    }
                    var user = {
                        id: rows[0].Id,
                        userName: rows[0].user_name
                    }
                    return done(null, user);
                })
            })
        })
    );

    passport.use(
        'local-register',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Promise.using(getSqlConnection(), function(conn){
                var user = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null),
                    mail: req.body.mail
                }
                return conn.query("SELECT * FROM user WHERE user_name = ?", [username]).then(function(rows){
                    if(rows.length){
                        return "has user";
                    }else{
                        user.id = uuid.generateUUID();
                        return conn.query("INSERT INTO user ( id, user_name, password, mail ) values (?,?,?,?)", [user.id, user.username, user.password, user.mail]);
                    }
                }).then(function(data){
                    if(data == 'has user'){
                        return done(null, false, req.flash('msg', '该用户名已被注册。'));
                    }else{
                        return done(null, user);
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            })
        })
    );
};
