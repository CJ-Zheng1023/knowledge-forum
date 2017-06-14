var saveto = Common.getImgSaveTo();
var qiniu_upload_domain = Common.getQiniuUploadDomain();
var qiniu_bucket_domain = Common.getQiniuBucketDomain();
$(function(){
    CKEDITOR.replace('content',{"extraPlugins":"filebrowser,image,imagepaste,filetools"});
})