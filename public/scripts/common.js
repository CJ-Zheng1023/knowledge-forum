$.WEB_ROOT = "";
var Common = (function($){
    var qiniu_token_url = $.WEB_ROOT + "/api/v1/token";
    var qiniu_bucket_domain = "http://or1zifxf6.bkt.clouddn.com";
    var qiniu_upload_domain = "http://up-z1.qiniu.com";
    var img_save_to  = "qiniu";
    var noImageUrl = $.WEB_ROOT + "/images/no-img.jpg";


    return{
        getQiniuTokenUrl: function(){
            return qiniu_token_url;
        },
        getQiniuBucketDomain: function(){
            return qiniu_bucket_domain;
        },
        getQiniuUploadDomain: function(){
            return qiniu_upload_domain;
        },
        getImgSaveTo: function(){
            return img_save_to;
        },
        initAlertCloseBtn: function(){
            $(".close").on("click", function(){
                $(this).parent().css("display", "none");
            })
        },
        getNoImageUrl: function(){
            return noImageUrl;
        }
    }

})(jQuery);


$(function(){
    Common.initAlertCloseBtn();


})