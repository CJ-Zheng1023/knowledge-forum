var saveto = Common.getImgSaveTo();
var qiniu_upload_domain = Common.getQiniuUploadDomain();
var qiniu_bucket_domain = Common.getQiniuBucketDomain();
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    var editor = CKEDITOR.replace('content',{"extraPlugins":"filebrowser,image,imagepaste,filetools"});

    $("[data-reply-user]").on('click', function(){
        var userName = $(this).attr("data-reply-user");
        editor.setData("@"+userName+" ");
    })
    var commentForm = $("#addCommentForm");
    commentForm.on('submit', function() {
        for(var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
    })

    commentForm.validate({
        //debug: true,
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            content: {
                required: true
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            content: {
                required: "请输入内容。"
            }
        },
        errorPlacement: function (error, element) { // render error placement for each input type
            if(element.attr("data-error-container")){
                error.appendTo(element.attr("data-error-container"));
            }else{
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        submitHandler: function (form) {
            form[0].submit(); // submit the form
        }
    });

})