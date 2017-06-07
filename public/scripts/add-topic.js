$(function(){
    $('#content').summernote({
        height: 300,
        lang: 'zh-CN',
        placeholder: '请输入内容...'
    });
    $('#content').on('summernote.blur', function() {
        $('#content').html($('#content').summernote('code'));
    });
})