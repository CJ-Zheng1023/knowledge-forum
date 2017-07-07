$(function(){
    $(".fileinput").on("change.bs.fileinput", function(){
        var imgSrc = $(this).find("img").attr("src");
        $("#userPhoto").val(imgSrc);
    })
    $(".fileinput").on("clear.bs.fileinput", function(){
        $(this).find(".thumbnail").append("<img src='"+Common.getNoImageUrl()+"' />");
        $("#userPhoto").val("");
    })


    var settingForm = $("#settingForm"), error = $("#settingForm .alert-danger");

    settingForm.validate({
        //debug: true,
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            password: {
                required: true,
                minlength: 6
            },
            signature: {
                maxlength: 20
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            password: {
                required: "请输入密码。",
                minlength: jQuery.validator.format("输入的密码长度不能少于{0}个字。")
            },
            signature: {
                maxlength: jQuery.validator.format("输入的签名长度不能超过{0}个字。")
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