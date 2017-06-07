module.exports = function(app, passport){

    //执行登录
    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res){
        res.redirect('/user/'+req.user.userName);
    });
    //执行注册
    app.post('/register', passport.authenticate('local-register', {
        successRedirect : '/register-success', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}