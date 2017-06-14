var saveto = Common.getImgSaveTo();
var qiniu_upload_domain = Common.getQiniuUploadDomain();
var qiniu_bucket_domain = Common.getQiniuBucketDomain();
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $("[data-reply-user]").on('click', function(){
        var userName = $(this).attr("data-reply-user");
        $("#content").summernote('code', $('#content').summernote('code')+"@"+userName+" ");
    })
    CKEDITOR.replace('content',{"extraPlugins":"filebrowser,image,imagepaste,filetools"});
})