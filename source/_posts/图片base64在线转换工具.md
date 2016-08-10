title: 图片与Base64在线转换工具
date: 2015-10-10 11:39:01
tags: Tools 图片 Base64
---

### Image to Base64:
<input type="file" id="file" style="width: 88%;"></textarea><textarea id="file_result" style="width: 88%;" rows="5"></textarea>

### Base64 to Image:
<textarea id="txt_base64" style="width: 88%;" rows="5"></textarea><button id="btnBase64ToImage" style="border: 1px solid #ccc; background-color:#e6e6e6; border-radius: 5px; padding: 2px 5px; font-size: 14px; color: #333;">Convert to image</button><p id="base64_result" style="word-break: break-all;"></p>

<script type="text/javascript">
    $(function(){
        var $file   = $("#file"), $fileResult = $("#file_result"),
            $txtBase64 = $("#txt_base64"), $base64Result = $("#base64_result");

        $("#btnBase64ToImage").on("click", function(){
            var img = document.createElement('img');
            img.src = $txtBase64.val();
            $base64Result.empty().append(img);
        });

        $file.on("change", function(){
            var file = this.files[0];
            if(file){
                var reader = new FileReader();
                reader.onload = function(e){
                     $fileResult.text(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    });
</script>