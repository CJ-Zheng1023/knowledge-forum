$(function(){

    pushHistory();

    $('#loginName').focus();
    function setScroll(){
        $('.scrollable').slimScroll({
            height: '100%'
        });
    }
    setScroll();
    $(window).on('resize', setScroll);
    $('.side-bar-toggle').on('click', function(){
        $('.side-bar').toggleClass('open');
    })


    var socket = io(), $login = $('.chat-login'), $room = $('.chat-room'), $userList = $('#userList'),
        $userCount = $('#userCount'), $messageList = $('#messageList');
    $('#loginForm').submit(function(){
        var loginName = $('#loginName').val().trim();
        if(!loginName){
            return false;
        }
        $login.fadeOut(function(){
            $room.fadeIn();
        });
        socket.emit('addUser', loginName);
        return false;
    })
    socket.on('queryUser', function(users){
        $userList.empty();
        $.each(users, function(index, user){
            $userList.append('<li class="list-group-item">' + user + '</li>')
        })
        $userCount.text(users.length);
    })
    $('#sendForm').submit(function(){
        var content = $('#messageContent').val().trim();
        if(!content){
            return false;
        }
        socket.emit('addMessage', {
            user: $room.data('currentUser'),
            content: content
        });
        $('#messageContent').val('');
        return false;
    })
    socket.on('cacheCurrentUser', function(currentUser){
        $room.data('currentUser', currentUser);
    })
    socket.on('queryMessage', function(message){
        var $item = $('<li></li>').addClass('message-item');
        var $belong = $('<div></div>');
        if(message.user == $room.data('currentUser')){
            $belong.addClass('own');
        }else{
            $belong.addClass('other');
        }
        var $user = $('<h3>' + message.user + '</h3>');
        var $content = $('<div class="message-content">' + message.content + '</div>');
        $belong.append($user).append($content);
        $item.append($belong);
        $messageList.append($item);
        var scrollTo = $('#messageList').height() - $('.message-box .scrollable').height();
        $('.message-box .scrollable').slimScroll({
            height: '100%',
            scrollTo: scrollTo
        })
    })
    socket.on('notify', function(data){
        if(!$room.data('currentUser')){
            return;
        }
        if(!data.user){
            return;
        }
        if(data.action == 'join'){
            $.bootstrapGrowl(data.user + '  加入了聊天室~~~', {
                type:'info',
                delay: 1000
            })
        }else{
            $.bootstrapGrowl(data.user + '  离开了聊天室 T.T', {
                type:'warning',
                delay: 1000,
                offset: {from: "bottom", amount: 80}
            })
        }
    })




    window.addEventListener("popstate", function(e) {
        //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            leaveAtBATPlatform();
            WeixinJSBridge.call('closeWindow'); //微信
        } else if(ua.indexOf("alipay")!=-1){
            leaveAtBATPlatform();
            AlipayJSBridge.call('closeWebview'); //支付宝
        }else if(ua.indexOf("baidu")!=-1){
            leaveAtBATPlatform();
            BLightApp.closeWindow(); //百度
        }else{
            window.close(); //普通浏览器
        }
    }, false);

    function leaveAtBATPlatform(){
        socket.emit('leaveAtBATPlatform');
    }


    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }


  $('.music-controls').on('click', function(){
    var me = $(this);
    if(me.hasClass('glyphicon-play')){
      $('.table-music>tbody>tr').removeClass('playing');
      me.closest('tr').addClass('playing');
      $('.music-controls').removeClass('glyphicon-pause').addClass('glyphicon-play');
      me.removeClass('glyphicon-play').addClass('glyphicon-pause');
      me.closest('tr').siblings().find('audio').each(function(i, dom){
        dom.pause();
        dom.currentTime = 0;
      })
      me.siblings('audio')[0].play();
    }else{
      me.removeClass('glyphicon-pause').addClass('glyphicon-play');
      me.siblings('audio')[0].pause();
    }
  })


})