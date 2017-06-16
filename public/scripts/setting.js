$(function(){
    $(".fileinput").on("change.bs.fileinput", function(){
        var imgSrc = $(this).find("img").attr("src");
        $("#userPhoto").val(imgSrc);
    })
    $(".fileinput").on("clear.bs.fileinput", function(){
        $(this).find(".thumbnail").append("<img src='"+Common.getNoImageUrl()+"' />");
        $("#userPhoto").val("");
    })
})