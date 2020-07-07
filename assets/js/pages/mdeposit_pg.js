$(function () {
    CheckPlayerAllowPG();
    $('.container_depopg .btnDepositGW').click(SubmitDepositPGForm);

    $('.container_depopg .pgate').change(function (e) {
        var x = $(this);
        var selected_pgid = $(x).val();

        var selected_channel_type = $('.container_depopg .rblPGtype input[type=radio]:checked').val();
        var ddl_pbank = $('.container_depopg .pbank');
        BindPGBank(selected_pgid, selected_channel_type, ddl_pbank);

        if (selected_channel_type == 5) { //virtual bank
            //console.log('go GetPGDepoAmtSetting');
            GetPGDepoAmtSetting(selected_pgid, selected_channel_type, false);
        } else if (selected_channel_type == 3) {
            $('.container_depopg #div_limit').hide();
            $('.container_depopg #div_fee').show();
        }
        return false;
    });

    $('.container_depopg .rblPGtype').change(function (e) {

        var x = $(this);

        var selected_channel_type = $(x).find('input[type=radio]:checked').val();

        var ddl_pgate_pg = $('.container_depopg #ddl_pgate_pg');
        BindPG(selected_channel_type, ddl_pgate_pg);

        $('#hid_gateType').val(selected_channel_type);
        $('.container_depopg #div_fee, .container_depopg #div_limit').hide();

        return false;
    });


    $('.currency').css('text-align', 'right');
    $('.currency').focus(function () {
        var value = $(this).val();
        $(this).val(value.replace(/\,/g, '').replace('.00', ''));
    });
    $('.currency').blur(function () {
        var value = $(this).val();
        var curr_pattern = /^\d+(\.\d{0,2})?$/;
        if (value) {
            value = value.split('.')[0];
            if (!curr_pattern.test(value)) {
                $(this).val('0.00');
            } else {
                $(this).val(value + '.00');
                $(this).val(numberWithCommas($(this).val()));
            }
        } else {
            $(this).val('0.00');
        }
    });

    $('.btnToggleDepoType').click(function () {
        showLoading();
        window.location.href = window.location.href.toLowerCase().replace('mdeposit_pg', 'mdeposit_cash');
    });
    $('.btnToggleDepoType2').click(function () {
        showLoading();
        window.location.href = window.location.href.toLowerCase().replace('mdeposit_pg', 'mdeposit_supermarket');
    });
});

BindPG = function (channelType, ddl) {

    var param = {
        channelType: channelType
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        //$(ddl).empty();
                        $(ddl).find('option[value!="0"]').remove();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.PGID).html(i.BankName + ' (' + i.PGName_Custom1 + ')'));
                        });
                        var ddl_pbank = $('.container_depopg #ddl_pbank');
                        if (ddl_pbank)
                            $(ddl_pbank).empty();
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

BindPGBank = function (pgId, channelType, ddl) {

    if (pgId <= 0)
        return false;


    var param = {
        pgId: pgId,
        channelType: channelType
    }

    //showLoading();
    $.ajax({
        url: "/handlers/GetPGBank.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            //closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        $(ddl).empty();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.ID).html(i.BankName));
                        });
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

SubmitDepositPGForm = function () {


    var param = {
        pgate: $('.container_depopg .pgate option:selected').val(),
        pbank: $('.container_depopg .pbank option:selected').val(),
        txtPGDepoAmt: $('.container_depopg .txtPGDepoAmt').val(),
        pg_promotion: $('.container_depopg .pg_promotion option:selected').val(),
        hid_gateType: $('#hid_gateType').val(),
    };

    var launch = false;

    showLoading();
    $.ajax(
    {
        url: "/handlers/DepositPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    var url = '/mobile' + o.msg;
                    if (url) {
                        SetPopupOpenerClickEvent(url);
                        launch = true;
                    }
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (xhr) {
            var msg = eval("(" + xhr.responseText + ")");
            alertMSG(msg);
            return false;
        }
    });

    if (launch == true)
        $('#btnPopupOpener').trigger('click');

    return false;
};


GetPGDepoAmtSetting = function (pgId, channelType, isMart) {

    var param = {
        pgId: pgId,
        channelType: channelType,
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPGDepoAmtSetting.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        var r = JSON.parse(o.data)[0];
                        var minAmt = r.Deposit_Min;
                        var maxAmt = r.Deposit_Max;
                        if (!isMart) {
                            try {
                                if (minAmt)
                                    $('.container_depopg span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                                if (maxAmt)
                                    $('.container_depopg span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                            } catch (err) {
                            }
                        } else {
                            try {
                                if (minAmt)
                                    $('.container_depopg span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                                if (maxAmt)
                                    $('.container_depopg span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                                //if ($('#isMobileView').val() == "true")
                                //    $('#div_limit').show();
                                //else
                                //    $('#div_limit_wm').show();
                                $('#div_limit').show();
                            } catch (err) {
                            }
                        }
                        if (parseInt(pgId) > 0) {
                            if (parseInt(channelType) == 3) {
                                $('#div_fee').show();
                                $('#div_limit').hide();
                            } else if (parseInt(channelType) == 5) {
                                $('#div_limit').show();
                                $('#div_fee').hide();
                            }
                        } else {
                            //$('#div_fee').hide();
                            $('#div_limit').hide();

                            //if ($('#isMobileView').val() != "true")
                            //    $('#div_limit_wm').hide();
                        }
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
            var msg = eval("(" + xhr.responseText + ")");
            alertMSG(msg);
        }
    });
};

CheckPlayerAllowPG = function () {
    $.ajax({
        url: "/handlers/CheckPlayerAllowPG.ashx",
        type: 'POST',
        async: true,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {

                    var cc_allow = o.data[0].allow;
                    var atm_allow = o.data[1].allow;

                    //web
                    if (!cc_allow && !atm_allow) {
                        alertMSGCallback("請洽客服開通", function () {
                            location.href = "/mobile/mdeposit_cash.aspx";
                        });
                    }
                    else {
                        if (!cc_allow) {
                            $(':radio#MainContent_rblChannelType_1').attr('checked', true).trigger('change');
                            $(':radio#MainContent_rblChannelType_0').bind('click', function () {
                                alertMSGCallback("請洽客服開通", function () {
                                    $(':radio#MainContent_rblChannelType_1').trigger('click');
                                });
                            });
                        } else if (!atm_allow) {
                            $(':radio#MainContent_rblChannelType_0').attr('checked', true).trigger('change');
                            $(':radio#MainContent_rblChannelType_1').bind('click', function () {
                                alertMSGCallback("請洽客服開通", function () {
                                    $(':radio#MainContent_rblChannelType_0').trigger('click');
                                });
                            });
                        }
                    }
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};