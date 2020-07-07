
var loading_layer;


$(function () {
    //const loginBtn = document.getElementById('loginBtn');
    //const close_login = document.getElementById('close_login');
    //const modal_login = document.getElementById('modal_login');

    //loginBtn.addEventListener('click', () => {
    //    modal_login.classList.add('show-mobileModal');
    //});

    //close_login.addEventListener('click', () =>
    //    modal_login.classList.remove('show-mobileModal')
    //  );

    //alert(is_accessBlog);
    var hostname = window.location.hostname;
    if (is_accessBlog == "1" && (hostname.indexOf('999xc.net') > -1 || location.hostname === "localhost")) {
        $(".blogitem").show();
        $(".blogshowitem").hide();
    }

    $('#loginBtn').click(function() {
        $('#modal_login').addClass('show-mobileModal');
        $('#form_login .username').focus();

        $('.footer_beforelogin').hide();
    });
    $('#close_login').click(function () {
        $('#modal_login').removeClass('show-mobileModal');
        $('.footer_beforelogin').show();
    });

    $('.menuMainMobile .menu_text').click(function () {
        if ($('#isLogedin').val() == "false") {
            $('.menuMainMobile .closeBtn').click();
            $('#loginBtn').click();
        }
    });
});


showLoading = function () {
    //alert('asd');
    loading_layer = layer.open({ type: 2 });
}

closeLoading = function () {
    layer.close(loading_layer);
}

alertMSG = function (msg) {
    var index = layer.open({
        content: msg
        , btn: 'OK'
    });
}

alertMSGConfirmSubmit = function (msg, callback) {
    var index = layer.open({
        content: msg
        , btn: ['確認', '取消']
        , yes: function () {
            layer.close(index);

            if (callback)
                callback();
        }
        , no: function () {
            layer.close(index);
        }
    });
}


alertMSGRes = function (msg, redirect) {
    var index = layer.open({
        content: msg
        , btn: 'OK'
        , yes: function () {
            layer.close(index);
            if (redirect) {
                window.location = redirect;
            } else {
                if (window.location.pathname.toLowerCase() == '/register')
                    window.location = '/';
                else
                    window.location.reload(true);
            }
        }
    });
}

alertMSGLogin = function (msg, referrer) {
    var index = layer.open({
        content: msg
        , btn: ['登入', '立即註冊']
        , yes: function () {
            if (referrer) {
                $('.btnLogin').attr('data-redirect', referrer);
            }
            layer.close(index);
            $('#loginBtn').trigger('click');
        }
        , no: function () {
            layer.close(index);
            //open register form
            window.location = '/register';
        }
    });
}


alertMSGCallback = function(msg, callback) {

    var index = layer.open({
        content: msg,
        btn: 'OK',
        shadeClose: false,
        yes: function() {
            layer.close(index);
            if (callback)
                callback();
        }
    });
};


alertMSGWithdraw = function(callback) {

    var content = "<div>";
    content += "<p style='text-align: left;'>如當日出款次數超過3次，會收取出款手續費用，如同意的話系統會自動批准該筆取款<p>";
    content += "<p style='margin-top: 1.5em;'><label for='withdrawNotice_doNotDisplayAgain' class='checkbox-inline'><input type='checkbox' id='withdrawNotice_doNotDisplayAgain' class='withdrawNotice_doNotDisplayAgain'>不再顯示</label></input></p>";
    content += "</div>";

    var index = layer.open({
        title: '提款提示',
        shadeClose: false,
        content: content,
        btn: ['同意', '取消'],
        yes: function() {

            /* COOKIES */
            var doNotDisplayAgain = $('.withdrawNotice_doNotDisplayAgain').is(":checked");
            if (doNotDisplayAgain) {
                var currentDate = new Date();
                var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
                $.cookie("withdrawNotice_doNotDisplayAgain", currentDate, { expires: expirationDate, path: "/" });
            }

            layer.close(index);

            callback();
        },
        no: function() {
            layer.close(index);
        }
    });
};


getRouteUrlParameter = function (sParam) {
    var value = window.location.pathname;

    var sub = value.split('/');
    if (sub.indexOf(sParam) > -1) {
        return sub[sub.indexOf(sParam) + 1];
    } else {
        return null;
    }
};


SetPopupOpenerClickEvent = function (url) {
    var event = "window.open('" + url + "', '_blank')";
    $('#btnPopupOpener')
        .attr('onclick', event);
}