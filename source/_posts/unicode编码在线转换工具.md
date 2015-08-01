title: unicode编码在线转换工具
date: 2015-08-01
---
<div>
<textarea id="encode" style="width: 88%;" rows="5"></textarea>
<button id="btnEncode" style="border: 1px solid #ccc; background-color:#e6e6e6; border-radius: 5px; padding: 2px 5px; font-size: 14px; color: #333;">encode</button><p id="encode_result" style="word-break: break-all;"></p>

<textarea id="decode" style="margin-top: 30px; width: 88%;" rows="5"></textarea>
<button id="btnDecode" style="border: 1px solid #ccc; background-color:#e6e6e6; border-radius: 5px; padding: 2px 5px; font-size: 14px; color: #333;">decode</button><p id="decode_result" style="word-break: break-all;"></p>
</div>

<script type="text/javascript">
    $(function(){
        var $decode = $("#decode"), $decode_result = $("#decode_result"),
            $encode = $("#encode"), $encode_result = $("#encode_result");

        $("#btnEncode").on("click", function(){
            //$encode_result.text(escape($encode.val()).replace(/%u/g, '\\u'));
            var text = $encode.val(), len = text.length, results = [];
            while(len){
                results.unshift(
                    '\\u' +
                    ('00' + text.charCodeAt(--len).toString(16)).slice(-4)
                );
            }
            $encode_result.text(results.join(''));
        });

        $("#btnDecode").on("click", function(){
            $decode_result.text(unescape($decode.val().replace(/\\u/g, '%u')));
        });
    });
</script>