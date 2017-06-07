$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $("[data-reply-user]").on('click', function(){
        var userName = $(this).attr("data-reply-user");
        $("#content").summernote('code', $('#content').summernote('code')+"@"+userName+" ");
    })


    $('#content').summernote({
        height: 300,
        lang: 'zh-CN',
        placeholder: '请输入内容...',
        callbacks: {
            onImageUpload: function(files) {
                console.log(files)
                // upload image to server and create imgNode...
                //$summernote.summernote('insertNode', imgNode);
            }
        }
    });
    $('#content').on('summernote.blur', function() {
        $('#content').html($('#content').summernote('code'));
    });
})