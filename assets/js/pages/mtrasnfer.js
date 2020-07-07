
var wallet_list = [1, 10, 12, 21, 24, 25, 32, 44, 46, 51, 53, 55, 58, 59, 62, 65];
//var wallet_list = [1, 6];
var timeout = 20; //max wallet get balance seconds

$(function () {

});


RefreshWallet = function (sender) {
    try {
        var siteId = $(sender).data('val');
        if (siteId > 0) {

            var param = {
                siteId: siteId,
            }

            $.ajax({
                url: "/handlers/CheckWalletBalance.ashx",
                type: 'POST',
                data: JSON.stringify(param),
                async: true,
                timeout: 1000 * timeout,
                beforeSend: function () {
                    setTimeout(function() {
                        $(sender).attr("src", "Assets/img/loading.gif");
                        $(sender).parent().parent().find('p:first').html("-");
                    }, 200);
                },
                success: function (data) {
                    setTimeout(function () {
                        try {
                            if (!isNaN(parseFloat(data))) {
                                var amt = numberWithCommas(parseFloat(data).toFixed(2));
                                $(sender).parent().parent().find('p:first').html(amt);
                                if (siteId == "1")
                                    $('.mywallet').text(amt);
                            }
                            else
                                $(sender).parent().parent().find('p:first').html(data);
                        } catch (err) {
                            $(sender).parent().parent().find('p:first').html(data);
                        }
                    }, 200);
                    
                },
                complete: function (data) {
                    setTimeout(function () {
                        $(sender).attr("src", "assets/img/icon_refresh.png");
                    }, 200);
                   
                },
                error: function () {
                    $(sender).parent().parent().find('p:first').html("0.00");
                }
            });
        }
    } catch (err) {
    }

    return false;
}


RefreshWalletTransfer = function (fromSiteId, toSiteId) {
    var refresh_list = [fromSiteId, toSiteId];
    setTimeout(function () {
        jQuery.each(refresh_list, function (idx, val) {
            var sender = $('.walletIcon[data-val=' + val + ']');
            RefreshWallet(sender);
        });
    }, 500);
}


transferOutAll = function () {

    //showLoading();
    //var param = {}
    //$.ajax({
    //    url: "myprofile.aspx/TransferOut",
    //    type: 'POST',
    //    //async: false,
    //    data: JSON.stringify(param),
    //    //data: param,
    //    contentType: "application/json",
    //    dataType: 'JSON',
    //    success: function (result) {
    //        if (result.d) {
    //            var o = JSON.parse(result.d);
    //            var msg = o.msg;
    //            closeLoading();
    //            alert(msg);
    //            $('.walletIcon[data-val=0]').click();
    //        }
    //    },
    //    error: function (xhr) {
    //        closeLoading();
    //        alert('带回失败!');
    //    }
    //});

    showLoading();
    $.ajax(
    {
        url: "/handlers/TransferOutAll.ashx",
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            //closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    alertMSGCallback(o.msg, function() {
                        $('.walletIcon[data-val=0]').trigger('click');
                    });
                    //location.reload(true);
                    //setTimeout(function() {
                    //    jQuery.each(wallet_list, function(idx, val) {
                    //        var sender = $('.walletIcon[data-val=' + val + ']');
                    //        RefreshWallet(sender);
                    //    });
                    //}, 500);
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (xhr, textStatus, error) {
            alertMSG('轉賬失敗!');
        },
        complete: function() {
            closeLoading();
        }
    });
}
