var saveto = Common.getImgSaveTo();
var qiniu_upload_domain = Common.getQiniuUploadDomain();
var qiniu_bucket_domain = Common.getQiniuBucketDomain();
$(function(){
   var editor = CKEDITOR.replace('content',{"extraPlugins":"filebrowser,image,imagepaste,filetools"});

    $("#resetBbn").on("click", function(){
        editor.setData('');
    })


    var topicForm = $("#addTopicForm"), error = $("#addTopicForm .alert-danger");

    topicForm.on('submit', function() {
        for(var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
    })

    topicForm.validate({
        //debug: true,
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            category: {
                required: true
            },
            title: {
                required: true,
                maxlength: 100
            },
            content: {
                required: true
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            category: {
                required: "请选择分类。"
            },
            title: {
                required: "请输入标题。",
                maxlength: jQuery.validator.format("输入的标题长度不能超过{0}个字。")
            },
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
            error.show();
            $("body").animate({
                scrollTop: 0
            })
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        submitHandler: function (form) {
            error.hide();
            form[0].submit(); // submit the form
        }

    });
})