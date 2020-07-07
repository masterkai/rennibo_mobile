﻿
function getDepositWYNext(hid) {
    if (hid == "depositWY_one_div") {
        var obj = document.getElementsByName('bankId');
        var id = null;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                id = obj[i].value;
            }
        }
        $("#txtDeposit_user_bankId").val(id);

        if (id != null) {
            $("#depositWY_two_div").show();
            $("#bankImgTwo").attr("src", $("#bankImg" + id).val());
            var swiftCode = $("#swiftCode" + id).val();
            if (swiftCode == 'bankZFB') {
                $("#txtDAccountNumberDiv").hide();
                $("#TenPayDiv").hide();
                $("#AlipayDiv").show();
            } else if (swiftCode == 'bankCFT') {
                $("#txtDAccountNumberDiv").hide();
                $("#AlipayDiv").hide();
                $("#TenPayDiv").show();
            } else {
                $("#AlipayDiv").hide();
                $("#TenPayDiv").hide();
                $("#txtDAccountNumberDiv").show();
            }

            $("#depositWY_one_div").hide();
        } else {
            JqueryShowMessage(b_msg['msg8']);
        }
    } else if (hid == "depositATM_one_div") {
        var obj = document.getElementsByName('bankId');
        var id = null;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                id = obj[i].value;
            }
        }
        if (id != null) {
            $("#txtDeposit_user_bankId").val(id);
            $("#depositATM_two_div").show();

            $("#depositATM_one_div").hide();
        } else {
            JqueryShowMessage(b_msg['msg8']);
        }

    } else if (hid == "close") {
        window.close();
    }

}

function getDepositWYNextPhone(hid) {
    if (hid == "xinxi_one") {
        var obj = document.getElementsByName('bankId');
        var id = null;
        var isOk = "0";
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                id = obj[i].value;
                isOk = "1";
            }
        }
        if (isOk == "1") {
            $("#bankInfoId").val(id);
            $("#xinxi_one").hide();
            $("#xinxi_two").show();
        } else {
            JqueryShowMessageReload(l_bank['msg10']);
        }
    } else if (hid == "close") {
        window.close();
    }

}
function getDepositWYNextPhoneNew(hid) {
    if (hid == "xinxi_one") {
        $("#xinxi_one").hide();
        $("#xinxi_two").show();
        var obj = $("#bankId").val();
        $("#bankInfoId").val(obj);
    } else if (hid == "close") {
        window.close();
    }

}

function depositTypeMp() {
    var type = $("#InType").val();
    if (type == 'BANK_CAR_ATM_CASH' || type == 'BANK_CAR_BANK_COUNTERS') {
        $("#depositType").show();
    } else {
        $("#depositType").hide();
    }
}

function depositType(type) {
    if (type == 'BANK_CAR_ATM_CASH' || type == 'BANK_CAR_BANK_COUNTERS') {
        $("#depositType").show();
    } else {
        $("#depositType").hide();
    }
}

function getLastDeposit(hid) {
    if (hid == "xinxi_one") {
        $("#xinxi_one").show();
        $("#xinxi_two").hide();
    } else if (hid == "depositATM_two_div") {
        $("#depositATM_one_div").show();
        $("#depositATM_two_div").hide();
    }
}

function getLast(hid) {
    if (hid == "depositWY_two_div") {
        $("#depositWY_one_div").show();
        $("#depositWY_two_div").hide();

    } else if (hid == "depositATM_two_div") {
        $("#depositATM_one_div").show();
        $("#depositATM_two_div").hide();
    }

}

function creditFormSubmit(form, status) {
    var isMobileOrPc = $("#isMobileOrPc").val();
    var transferOut = "";
    var transferIn = "";
    if (isMobileOrPc == "mobile") {
        transferOut = document.getElementsByName("transferOut")[0];
        transferIn = document.getElementsByName("transferIn")[0];
        if (undefined === transferOut) {
            alert("请选择转出钱包!");
            return false;
        }
        if (undefined === transferIn) {
            alert("请选择转入钱包!");
            return false;
        }
        if (transferOut.attributes["id"].value == transferIn.attributes["id"].value) {
            alert("转入钱包不能相同!");
            return false;
        }
        if (isNaN($("#out_" + transferOut.attributes["id"].value).html())) {
            alert("转出钱包余额不足!");
            return false;
        }
        if (Number($("#out_" + transferOut.attributes["id"].value).html()) < Number($("#txtAmount").val())) {
            alert("转出钱包余额不足!");
            return false;
        }
    }
    var creditHint = "";
    var flagAmount = false;
    var type = /^[1-9]+[0-9]*]*$/;
    if ($("#txtAmount").val() == null || $("#txtAmount").val() == "" || $("#txtAmount").val() == "0") {
        creditHint = "请输入转账金额！";
        flagAmount = true;
    } else if (!type.test($("#txtAmount").val())) {
        creditHint = "请修改您的转账金额为有效正整数！";
        flagAmount = true;
    }
    if (flagAmount) {
        alert(creditHint);
        $('#credit_progress_bar').hide();
        $('#credit_progress_bar #casePourpre').hide();
        $('#text_prompts').html("");
        return false;
    }
    if (status) {
        var o = {};
        var a = $("#creditForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        //		if (confirm(l_message['msg7'])) {
        art.artDialog({
            id: 'Confirm',
            title: l_artDialog["title"],
            fixed: true,
            lock: true,
            okVal: l_yesOrNo['yes'],
            cancelVal: l_yesOrNo['no'],
            opacity: 0.6,
            content: l_message['msg7'],
            width: '260px',
            ok: function (here) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/creditFormSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: true,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        if ($("#credit_progress_bar").length > 0) {
                            $("#credit_progress_bar").show();
                            $("#credit_progress_bar #casePourpre").show();
                        } else {
                            $("#maskDiv").show();
                        }
                    },
                    success: function (data) {
                        if (data) {
                            if (data.success == true) {
                                if (data.Refresh == 0) {
                                    getBalanceByClass(data.walletName_Out);
                                    getBalanceByClass(data.walletName_In);
                                    $('#text_prompts').html("转账成功，祝您游戏愉快！");
                                } else {
                                    JqueryShowMessageReload(b_msg['msg2']);
                                }
                            } else {
                                var textPromptsError = "";
                                if (data.message == 'AMOUNT_ZERO') {
                                    textPromptsError = l_deposit['msg7'];
                                } else if (data.message == 'SESSION_EXPIRED') {
                                    textPromptsError = b_msg['msg1'];
                                } else if (data.message == 'CREDIT_ERROR') {
                                    textPromptsError = b_msg['msg1'];
                                } else if (data.message == 'TRY_AGAIN') {
                                    textPromptsError = l_basic['tryAgain'];
                                } else if (data.message == 'GET_BALANCE_NO_ENOUGH') {
                                    textPromptsError = b_msg['msg3'];
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    textPromptsError = l_deposit['msg3'];
                                } else if (data.message == 'TIME_OUT') {
                                    textPromptsError = b_msg['msg10'];
                                } else if (data.message == 'WALLET_ERROR') {
                                    textPromptsError = b_msg['msg11'];
                                } else if (data.message == 'OG_WALLET_ERROR') {
                                    textPromptsError = b_msg['msg13'];
                                } else if (data.message == 'MAX_TRANS_MONEY') {
                                    textPromptsError = b_msg['msg14'];
                                } else if (data.message == 'IN_HTE_GAME') {
                                    textPromptsError = b_msg['msg15'];
                                } else if (data.message == 'ACCOUNT_IS_FROZEN') {
                                    textPromptsError = b_msg['msg16'];
                                } else {
                                    textPromptsError = data.message;
                                }

                                if (data.Refresh == 0) {
                                    $('#text_prompts').html("转账失败，提示：" + textPromptsError);
                                } else {
                                    if (data.message == 'AMOUNT_ZERO' || data.message == 'SESSION_EXPIRED') {
                                        JqueryShowMessageHome(textPromptsError);
                                    } else {
                                        JqueryShowMessage(textPromptsError);
                                    }
                                }
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                        $('#text_prompts').html("转账失败!");
                        JqueryShowMessage(l_basic['tryAgain']);
                    },
                    complete: function () {
                        $("#maskDiv").hide();
                        $('#credit_progress_bar').hide();
                        $('#credit_progress_bar #casePourpre').hide();
                    }
                });
            },
            cancel: function (here) {
            }
        });
    }
}

function recoverBalance(form) {
    var o = {};
    var a = $("#creditForm").serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    var jsonuserinfo = $.toJSON(o);
    //		if (confirm(l_message['msg10'])) {
    art.artDialog({
        id: 'Confirm',
        title: l_artDialog["title"],
        fixed: true,
        lock: true,
        okVal: l_yesOrNo['yes'],
        cancelVal: l_yesOrNo['no'],
        opacity: 0.6,
        content: l_message['msg10'],
        width: '260px',
        ok: function (here) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/recoverBalance?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                    if ($("#credit_progress_bar").length > 0) {
                        $("#credit_progress_bar").show();
                        $("#credit_progress_bar #casePourpre").show();
                    }
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            if (data.Refresh == 0) {
                                $('#text_prompts').html("余额回收成功，您的余额已汇入主钱包！");
                                var obj = new Object();
                                var objMain = new Object();
                                obj.walletId = "";
                                objMain.walletId = "";
                                getWalletIdOrName($("#creditIn option:selected").val(), obj);
                                getWalletIdOrName($("#creditOut option:selected").val(), objMain);
                                getBalanceByClass(obj.walletId);
                                getBalanceByClass(objMain.walletId);
                            } else {
                                JqueryShowMessageReload(b_msg['msg2']);
                            }
                        } else {
                            var textPromptsError = "";
                            if (data.message == 'CREDIT_ERROR') {
                                textPromptsError = b_msg['msg1'];
                            } else if (data.message == 'TRY_AGAIN') {
                                textPromptsError = l_basic['tryAgain'];
                            } else if (data.message == 'GET_BALANCE_NO_ENOUGH') {
                                textPromptsError = b_msg['msg3'];
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                textPromptsError = l_deposit['msg3'];
                            } else if (data.message == 'TIME_OUT') {
                                textPromptsError = b_msg['msg10'];
                            } else if (data.message == 'WALLET_ERROR') {
                                textPromptsError = b_msg['msg11'];
                            } else if (data.message == 'ZERO_BALANCE_NOT_MAIN_WAELLT') {
                                textPromptsError = b_msg['msg12'];
                            } else {
                                textPromptsError = data.message;
                            }

                            if (data.Refresh == 0) {
                                $('#text_prompts').html("余额回收失败，提示：" + textPromptsError);
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else {
                                    JqueryShowMessage(textPromptsError);
                                }
                            }
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                    $('#text_prompts').html("余额回收失败！");
                    JqueryShowMessage(l_basic['tryAgain']);
                },
                complete: function () {
                    $("#maskDiv").hide();
                    $('#credit_progress_bar').hide();
                    $('#credit_progress_bar #casePourpre').hide();
                }
            });
        },
        cancel: function (here) {
        }
    });

}

function withdrawOnLineSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#withdrawOnLineForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        //		if (confirm(l_message['msg9'])) {
        art.artDialog({
            id: 'Confirm',
            title: l_artDialog["title"],
            fixed: true,
            lock: true,
            okVal: l_yesOrNo['yes'],
            cancelVal: l_yesOrNo['no'],
            opacity: 0.6,
            content: l_message['msg9'],
            width: '260px',
            ok: function (here) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/withdrawOnLineSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: false,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        $('#maskDiv').show();
                    },
                    success: function (data) {
                        $('#maskDiv').hide();
                        if (data) {
                            if (data.success == true) {
                                JqueryShowMessageReload(l_withdraw['msg1']);
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    JqueryShowMessage(l_deposit['msg3']);
                                } else if (data.message == 'WITHDRAW_PASSWORD_ERROR') {
                                    JqueryShowMessage(l_withdraw['msg6']);
                                } else if (data.message == 'BANKER_NO_NAME_DIFFENT_FIRST_NAME') {
                                    JqueryShowMessage(l_deposit['msg4']);
                                } else if (data.message == 'GET_BALANCE_NO_ENOUGH') {
                                    JqueryShowMessage(l_withdraw['msg8']);
                                } else if (data.message == 'MAX_WITHDRAW_OVER') {
                                    JqueryShowMessage(l_withdraw['msg15']);
                                } else if (data.message == 'WALLET_SENTING') {
                                    JqueryShowMessage(l_withdraw['msg8']);
                                } else if (data.message == 'RECORD_GENERATED') {
                                    JqueryShowMessage(l_withdraw['msg14']);
                                } else if (data.message == 'DEMO') {
                                    JqueryShowMessage(l_withdraw['msg10']);
                                } else if (data.message == 'TRY_AGAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else if (data.message == 'MAIN_WALLET_MAINTAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else {
                                    JqueryShowMessage(l_withdraw['msg11']);
                                }
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                        alert("网络异常，请稍后再试！");
                    },
                    complete: function () {
                    }
                });
            },
            cancel: function (here) {
            }
        });

    }
}

/*function DBCtwoSubmit(form,status){
	if(status) {
//		var o = {};
//		var a = $("#DBCtwoForm").serializeArray();
//	    $.each(a, function() {
//	       if (o[this.name]) {
//	           if (!o[this.name].push) {
//	               o[this.name] = [o[this.name]];
//	           }
//	           o[this.name].push(this.value || '');
//	       } else {
//	           o[this.name] = this.value || '';
//	       }
//	    });
	    getNext('bcar_two_d');
	} 

	
	
}*/


function DBCthreeSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#DBCthreeForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/DBCthreeSubmit?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
            },
            success: function (data) {
                if (data) {
                    if (data.success == true) {
                        $("#bcar_three").removeAttr("class");
                        $("#bcar_four").attr("class", "c");

                        $("#companyBankInfo").html(data.companyBankInfo);

                        $("#o_depositAoumt").html(data.toAmount);
                        $("#o_depositDate").html(data.depositDate);
                        $("#o_orderNum").html(data.orderNum);
                        $("#o_userBankName").html(data.userBankName);
                        $("#o_depositName").html(data.depositName);
                        $("#o_paymentMethod").html(l_paymentMethod[data.paymentMethod]);

                        //						var num = data.paymentMethod;
                        //						var paymentMethod ;
                        //						if(num =='0'){
                        //							paymentMethod =l_bank['msg0'];
                        //						}else if(num == '1'){
                        //							$("#tr_myBranchName").show();
                        //							$("#td_myBranchName").html("ATM所属分行:");
                        //							$("#o_myBranchName").html(data.myBranchName);
                        //							paymentMethod =l_bank['msg1'] ;
                        //						}else if(num == '2'){
                        //							$("#tr_myBranchName").show();
                        //							$("#td_myBranchName").html("ATM所属分行:");
                        //							$("#o_myBranchName").html(data.myBranchName);
                        //							paymentMethod =l_bank['msg2'] ;
                        //						}else if(num == '3'){
                        //							$("#tr_myBranchName").show();
                        //							$("#td_myBranchName").html("银行柜台所属分行:");
                        //							$("#o_myBranchName").html(data.myBranchName);
                        //							paymentMethod =l_bank['msg3'] ;
                        //						}else if(num == '4'){
                        //							paymentMethod =l_bank['msg4'] ;
                        //						}
                        //						
                        //						$("#o_paymentMethod").html(paymentMethod);

                        $("#bcar_three_d").hide();
                        $("#bcar_four_d").show();

                    } else {
                        if (data.message == 'SESSION_EXPIRED') {
                            JqueryShowMessageHome(l_basic['sessionExpired']);
                        } else if (data.message == 'STATUS_NO_OPEN') {
                            JqueryShowMessage(l_deposit['msg3']);
                        } else if (data.message == 'TRY_AGAIN') {
                            JqueryShowMessage(l_basic['tryAgain']);
                        }
                    }
                }
            },
            error: function (xmlhttprequest, error) {
            },
            complete: function () {
            }
        });
    }
}

function addBankCardForm(form, status) {
    if (status) {
        var o = {};
        var a = $("#addBankCardForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/addBankCardForm?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
                $('#maskDiv').show();
            },
            success: function (data) {
                $('#maskDiv').hide();
                if (data) {
                    if (data.success == true) {
                        $('#maskDiv').hide();
                        JqueryShowMessageReload(l_bank['msg5']);
                    } else {
                        if (data.message == 'STATUS_NO_OPEN') {
                            $('#maskDiv').hide();
                            JqueryShowMessage(l_password['msg4']);
                        } else if (data.message == 'USERNAME_OR_PASSWORD') {
                            $('#maskDiv').hide();
                            JqueryShowMessage(l_password['msg2']);
                            //							changeRegCode();
                        } else if (data.message == 'SESSION_EXPIRED') {
                            $('#maskDiv').hide();
                            JqueryShowMessageHome(l_basic['sessionExpired']);
                        } else if (data.message == 'TRY_AGAIN') {
                            $('#maskDiv').hide();
                            JqueryShowMessage(l_basic['tryAgain']);
                        } else if (data.message == 'BANK_BINDYET') {
                            $('#maskDiv').hide();
                            JqueryShowMessageReload(l_bank['msg7']);
                        }
                    }
                }
            },
            error: function (xmlhttprequest, error) {
            },
            complete: function () {
            }
        });
    }
}

function withdrawBankCardModifyForm(form, status) {
    if (status) {
        var o = {};
        var a = $("#withdrawBankCardModifyForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/withdrawBankCardModifyForm?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
                $('#maskDiv').show();
            },
            success: function (data) {
                $('#maskDiv').hide();
                if (data) {
                    if (data.success == true) {
                        JqueryShowMessageReload(l_bank['msg9']);
                    } else {
                        if (data.message == 'STATUS_NO_OPEN') {
                            JqueryShowMessage(l_password['msg4']);
                        } else if (data.message == 'USERNAME_OR_PASSWORD') {
                            JqueryShowMessage(l_password['msg2']);
                            //							changeRegCode();
                        } else if (data.message == 'SESSION_EXPIRED') {
                            JqueryShowMessageHome(l_basic['sessionExpired']);
                        } else if (data.message == 'TRY_AGAIN') {
                            JqueryShowMessage(l_basic['tryAgain']);
                        } else if (data.message == 'BANK_BINDYET') {
                            JqueryShowMessageReload(l_bank['msg6']);
                        }
                    }
                }
            },
            error: function (xmlhttprequest, error) {
            },
            complete: function () {
            }
        });
    }
}
function withdrawBankCardDeleteForm(form, status) {
    if (status) {
        var o = {};
        var a = $("#deleteBankCardForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/withdrawBankCardDeleteForm?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
                $('#maskDiv').show();
            },
            success: function (data) {
                $('#maskDiv').hide();
                if (data) {
                    if (data.success == true) {
                        JqueryShowMessageReload(l_bank['msg8']);
                    } else {
                        if (data.message == 'STATUS_NO_OPEN') {
                            JqueryShowMessage(l_password['msg4']);
                        } else if (data.message == 'USERNAME_OR_PASSWORD') {
                            JqueryShowMessage(l_password['msg2']);
                            //							changeRegCode();
                        } else if (data.message == 'SESSION_EXPIRED') {
                            JqueryShowMessageHome(l_basic['sessionExpired']);
                        } else if (data.message == 'TRY_AGAIN') {
                            JqueryShowMessage(l_basic['tryAgain']);
                        } else if (data.message == 'BANK_BINDYET') {
                            JqueryShowMessageReload(l_bank['msg6']);
                        }
                    }
                }
            },
            error: function (xmlhttprequest, error) {
                $('#maskDiv').hide();
            },
            complete: function () {
            }
        });
    }
}

function withdrawChangePasswordFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#withdrawChangePasswordForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/withdrawChangePasswordFormSubmit?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
            },
            success: function (data) {
                if (data) {
                    //					data.message = 'SESSION_EXPIRED'
                    if (data.success == true) {
                        JqueryShowMessageReload(l_password['msg5']);
                        //window.close();
                    } else {
                        if (data.message == 'SESSION_EXPIRED') {
                            JqueryShowMessageHome(l_basic['sessionExpired']);
                        } else if (data.message == 'STATUS_NO_OPEN') {
                            JqueryShowMessage(l_deposit['msg3']);
                        } else if (data.message == 'TRY_AGAIN') {
                            JqueryShowMessage(l_basic['tryAgain']);
                        } else if (data.message == 'USERNAME_OR_PASSWORD') {
                            JqueryShowMessage(l_password['msg2']);
                            //							changeRegCode();
                        }

                    }
                }
            },
            error: function (xmlhttprequest, error) {
            },
            complete: function () {
            }
        });
    }
}
function depositWY_two_FormSubmit(form, status) {
    if (status) {
        if ($("#InType").val() === "neverSelect") {
            alert("请选择存款方式!");
            return false;
        }
        var o = {};
        var a = $("#depositWY_two_Form").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        //		if (confirm(l_message['msg8'])) {
        art.artDialog({
            id: 'Confirm',
            title: l_artDialog["title"],
            fixed: true,
            lock: true,
            okVal: l_yesOrNo['yes'],
            cancelVal: l_yesOrNo['no'],
            opacity: 0.6,
            content: l_message['msg8'],
            width: '260px',
            ok: function (here) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/depositWYTwoFormSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: false,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        $('#maskDiv').show();
                    },
                    success: function (data) {
                        $('#maskDiv').hide();
                        if (data) {
                            if (data.success == true) {
                                JqueryShowMessageReload(l_deposit['msg1']);
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    JqueryShowMessage(l_deposit['msg3']);
                                } else if (data.message == 'TRY_AGAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else if (data.message == 'DEMO') {
                                    JqueryShowMessageReload(l_deposit['msg5']);
                                }
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                    },
                    complete: function () {
                    }
                });
            },
            cancel: function (here) {
            }
        });

    }
}

function myrefresh() {
    //	JqueryShowMessageReload(l_basic['noAction']);
    alert(l_myrefresh['msg1']);
    window.close();
}

/*function depositATM_two_FormSubmit(form,status){
	if(status) {
		var o = {};
		var a = $("#depositATM_two_Form").serializeArray();
	    $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	    });
		var jsonuserinfo = $.toJSON(o);
		$.ajax({
			type : "post",
			url : $("#path").val() + "/app/depositATMTwoFormSubmit",
			data : jsonuserinfo,
			contentType : 'application/json',
			dataType : "json",
			async:false, 
			timeout : 50000,
			beforeSend : function(xmlhttprequest) {
			},
			success : function(data) {
				if (data) {
					if(data.success == true) {
						JqueryShowMessageReload(l_deposit['msg1']);
					} else {
						if(data.message == 'SESSION_EXPIRED') {
							JqueryShowMessageHome(l_basic['sessionExpired']);
						}else if(data.message == 'STATUS_NO_OPEN') {
							JqueryShowMessage(l_deposit['msg3']);
						}else if(data.message == 'TRY_AGAIN') {
							JqueryShowMessage(l_basic['tryAgain']);
						}
					}
				}
			},
			error : function(xmlhttprequest, error) {
			},
			complete : function() {
			}
		});
	} 
}*/



/*function depositCash_two_FormSubmit(form,status){
	if(status) {
		var o = {};
		var a = $("#depositCash_two_Form").serializeArray();
	    $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	    });
		var jsonuserinfo = $.toJSON(o);
		$.ajax({
			type : "post",
			url : $("#path").val() + "/app/depositCashTwoFormSubmit",
			data : jsonuserinfo,
			contentType : 'application/json',
			dataType : "json",
			async:false, 
			timeout : 50000,
			beforeSend : function(xmlhttprequest) {
			},
			success : function(data) {
				if (data) {
					if(data.success == true) {
						JqueryShowMessageReload(l_deposit['msg1']);
					} else {
						if(data.message == 'SESSION_EXPIRED') {
							JqueryShowMessageHome(l_basic['sessionExpired']);
						}else if(data.message == 'STATUS_NO_OPEN') {
							JqueryShowMessage(l_deposit['msg3']);
						}else if(data.message == 'TRY_AGAIN') {
							JqueryShowMessage(l_basic['tryAgain']);
						}
					}
				}
			},
			error : function(xmlhttprequest, error) {
			},
			complete : function() {
			}
		});
	} 
}*/

function onLineBankFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankGouFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankGouForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankGouFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineXinShengFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineXinShengForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineXinShengFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankTongForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYingBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankYingBaoForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYingBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankBaiFuTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankBaiFuTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

//盈宝第三方支付添加支付通道方法，可删
function writeYingBaoBank() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/writeYingBaoBank?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    for (var i = 0; i < data.yingBaoBank.length; i++) {
                        $("#onlineBinkId").append("<option value='" + data.yingBaoBank[i] + "'>" + l_yingBaoNameType[data.yingBaoBank[i]] + "</option>");
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function onLineBankYiBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankYiBaoForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYiBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankLeYingFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankLeYingFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


function callWithDrawPasswordModify(field, rules, i, options) {
    if (field.val() == $("#txtWithDrawPassword").val()) {
        return l_password['msg3'];
    }
}

function getNext(hid) {
    if (hid == "bcar_one_d") {
        var obj = document.getElementsByName('bankId');
        var id = null;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                id = obj[i].value;
            }
        }
        if (id != null) {
            $("#selectBankId").removeAttr("value");
            $("#hidden_toBankName").removeAttr("value");
            $("#hidden_toAccountName").removeAttr("value");
            $("#hidden_toAccountNo").removeAttr("value");

            $("#bcar_two_d").show();
            $("#selectBankId").attr("value", id);

            $("#toBankName").html($("#bankName" + id).val());
            $("#toAccountName").html($("#accountName" + id).val());
            $("#toBranchName").html($("#branchName" + id).val());
            $("#toAccountNo").html($("#accountNo" + id).val());
            //				$("#toImgName").val($("#imgName"+id).val());
            //				$("#toBankUrl").val($("#bankUrl"+id).val());
            //				$("#toBankId").val($("#bankUrl"+id).val());
            $("#DminA").html($("#minD" + id).val());
            $("#DmaxA").html($("#maxD" + id).val());



            $("#hidden_toBankName").attr("value", $("#bankName" + id).val());
            $("#hidden_toAccountName").attr("value", $("#accountName" + id).val());
            $("#hidden_toAccountNo").attr("value", $("#accountNo" + id).val());

            $("#bcar_one_d").hide();

            $("#bcar_one").removeAttr("class");
            $("#bcar_two").attr("class", "c");

        } else {
            JqueryShowMessage(b_msg['msg8']);
        }

    } else if (hid == "bcar_two_d") {

        //		var bankSelId = document.getElementById('bankSelId');
        //		if(bankSelId.checked){
        $("#bcar_three_d").show();

        $("#c_toBankName").html(document.getElementById('toBankName').innerHTML);
        $("#c_toAccountName").html(document.getElementById('toAccountName').innerHTML);
        $("#c_toBranchName").html(document.getElementById('toBranchName').innerHTML);
        $("#c_toAccountNo").html(document.getElementById('toAccountNo').innerHTML);

        $("#c_toBankId").val($("#selectBankId").val());

        $("#hidden_toBankName2").val($("#hidden_toBankName").val());
        $("#hidden_toAccountName2").val($("#hidden_toAccountName").val());
        $("#hidden_toAccountNo2").val($("#hidden_toAccountNo").val());

        $("#txtAmount").val($("#DAmount").val());
        $("#txtDepositTime").val($("#deposit_date").val() + " " + $("#deposit_date_hour").val() + ":" + $("#deposit_date_mis").val());

        var obj = document.getElementsByName('paymentMethod');
        var valId = null;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                valId = obj[i].value;
            }
        }

        $("#ATMCtype").html("");
        $("#ATMCtype").hide();

        var dhtml = "";
        var showDepositTypeName = "";

        if (valId == "0") {
            showDepositTypeName = "網銀转账";
        } else if (valId == "1") {
            showDepositTypeName = "ATM自动柜员机";
            $("#ATMCtype").show();
            dhtml += "<label>ATM所属分行：</label>";
            dhtml += "<div class='form-item'>";
            dhtml += "<input id='txtUserBranchName' name='txtUserBranchName' readonly='readonly'  class='validate[required] textinput width01' style='border: 0px;height: 35px'/>";
            dhtml += "</div>";
            $("#ATMCtype").html(dhtml);
            $("#txtUserBranchName").val($("#myBranchName").val());
        } else if (valId == "2") {
            showDepositTypeName = "ATM现金入款";
            $("#ATMCtype").show();
            dhtml += "<label>ATM所属分行：</label>";
            dhtml += "<div class='form-item'>";
            dhtml += "<input id='txtUserBranchName' name='txtUserBranchName' readonly='readonly'  class='validate[required] textinput width01' style='border: 0px;height: 35px'/>";
            dhtml += "</div>";
            $("#ATMCtype").html(dhtml);
            $("#txtUserBranchName").val($("#myBranchName").val());
        } else if (valId == "3") {
            showDepositTypeName = "银行柜台";
            $("#ATMCtype").show();
            dhtml += "<label>银行柜台所属分行：</label>";
            dhtml += "<div class='form-item'>";
            dhtml += "<input id='txtUserBranchName' name='txtUserBranchName' readonly='readonly'  class='validate[required] textinput width01' style='border: 0px;height: 35px'/>";
            dhtml += "</div>";
            $("#ATMCtype").html(dhtml);
            $("#txtUserBranchName").val($("#myBranchName").val());

        } else if (valId == "4") {
            showDepositTypeName = "手机银行转账";
        }

        $("#txtShowDepositType").val(showDepositTypeName);
        $("#txtDepositType").attr("value", valId);


        $("#bcar_two_d").hide();

        $("#bcar_two").removeAttr("class");
        $("#bcar_three").attr("class", "c");
        //		}else{
        //			JqueryShowMessage(b_msg['msg9']);
        //		}
    } else if (hid == "bcar_four_d") {
        window.close();
    } else {
        alert("Over");
    }

}

function baofooFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#baofooForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/baofooFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankZhiFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankZhiForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankZhiFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}




function onLineBankHaiOuShanFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }

        });
        var jsonuserinfo = $.toJSON(o);

        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHaiOuShanFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


function onLineBankGaoTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }

        });
        var jsonuserinfo = $.toJSON(o);

        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankGaoTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}



function onLineBankXinHuiFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankXinHuiFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankTengXinFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankTengXinFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankZhiNewFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankZhiForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankZhiNewFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankZhiNewWeChatFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankZhiForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankZhiNewWeChatFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankThreeWerDuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankZhiForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankThreeWerDuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShanFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShanFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHuaLianFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuaLianFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankTengXinFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankTengXinFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHuiChaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuiChaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYouFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYouFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYinBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYinBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankJinAnFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankJinAnFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankHuiChaoNewFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuiChaoNewFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankMoBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankMoBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankMiaoFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankMiaoFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHuiBaoTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuiBaoTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShangYinXinWangGuanFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShangYinXinWangGuanFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShangYinXinSaoMaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShangYinXinSaoMaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankGuoShengTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankGuoShengTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                            //							location.href= data.linkPage + "?htmlBuild=" + data.htmlBuild; 
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankJinFuKaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankJinFuKaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                            //							location.href= data.linkPage + "?htmlBuild=" + data.htmlBuild; 
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankXunFuTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankXunFuTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankXunBaoShangFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankXunBaoShangFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankKeXunFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankKeXunFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankKouDaiZhiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankKouDaiZhiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYiKaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYiKaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    alert("error");
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankPuXunFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankPuXunFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankFengDaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankFengDaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYaFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYaFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankZeShengFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankZeShengFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHeLiBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHeLiBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankAiNongYiZhanFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankAiNongYiZhanFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankAiNongYiZhanLunXunFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankAiNongYiZhanLunXunFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankXinBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankXinBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankZhiHuiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankZhiHuiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankEptFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankEptFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHuanXunFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuanXunFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankJuBaoFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankJuBaoFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankKuaiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankKuaiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankRenXinFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankRenXinFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankDuoDeBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankDuoDeBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankMiaoKaTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankMiaoKaTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankKaChengFormSubmit(form, status) {
    var url = document.location.href;
    var urls = url.substring(url.lastIndexOf("/") + 1);
    var requestUrl = urls.substring(0, urls.indexOf("?"));
    if (requestUrl === "depositOnLineKaCheng") {
        if (status) {
            var o = {};
            var a = $("#onLineBankForm").serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    } o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            var jsonuserinfo = $.toJSON(o);
            if (confirm(l_message['msg4'])) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/onLineBankKaChengFormSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: false,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        $("#maskDiv").show();
                    },
                    success: function (data) {
                        if (data) {
                            if (data.success == true) {
                                location.href = data.linkPage;
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    JqueryShowMessage(l_deposit['msg3']);
                                } else if (data.message == 'TRY_AGAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else if (data.message == 'DEMO') {
                                    JqueryShowMessage(l_deposit['msg5']);
                                } else if (data.message == 'THIRD_CHANGED') {
                                    JqueryShowMessageCloseWindow(l_deposit['msg6']);
                                }
                                $("#maskDiv").hide();
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                        $("#maskDiv").hide();
                    },
                    complete: function () {
                    }
                });
            }
        }
    } else if (requestUrl === "depositOnLineRuiFu") {
        if (status) {
            var o = {};
            var a = $("#onLineBankForm").serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    } o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            var jsonuserinfo = $.toJSON(o);
            if (confirm(l_message['msg4'])) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/onLineBankRuiFuFormSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: false,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        $("#maskDiv").show();
                    },
                    success: function (data) {
                        if (data) {
                            if (data.success == true) {
                                location.href = data.linkPage;
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    JqueryShowMessage(l_deposit['msg3']);
                                } else if (data.message == 'TRY_AGAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else if (data.message == 'DEMO') {
                                    JqueryShowMessage(l_deposit['msg5']);
                                } else if (data.message == 'THIRD_CHANGED') {
                                    JqueryShowMessageCloseWindow(l_deposit['msg6']);
                                }
                                $("#maskDiv").hide();
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                        $("#maskDiv").hide();
                    },
                    complete: function () {
                    }
                });
            }
        }

    } else if (requestUrl === "depositOnLineLiKeFu") {
        if (status) {
            var o = {};
            var a = $("#onLineBankForm").serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    } o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            var jsonuserinfo = $.toJSON(o);
            if (confirm(l_message['msg4'])) {
                $.ajax({
                    type: "post",
                    url: $("#path").val() + "/app/onLineBankLiKeFuFormSubmit?" + Math.random() * 10000,
                    data: jsonuserinfo,
                    contentType: 'application/json',
                    dataType: "json",
                    async: false,
                    timeout: 50000,
                    beforeSend: function (xmlhttprequest) {
                        $("#maskDiv").show();
                    },
                    success: function (data) {
                        if (data) {
                            if (data.success == true) {
                                location.href = data.linkPage;
                            } else {
                                if (data.message == 'SESSION_EXPIRED') {
                                    JqueryShowMessageHome(l_basic['sessionExpired']);
                                } else if (data.message == 'STATUS_NO_OPEN') {
                                    JqueryShowMessage(l_deposit['msg3']);
                                } else if (data.message == 'TRY_AGAIN') {
                                    JqueryShowMessage(l_basic['tryAgain']);
                                } else if (data.message == 'DEMO') {
                                    JqueryShowMessage(l_deposit['msg5']);
                                } else if (data.message == 'THIRD_CHANGED') {
                                    JqueryShowMessageCloseWindow(l_deposit['msg6']);
                                }
                                $("#maskDiv").hide();
                            }
                        }
                    },
                    error: function (xmlhttprequest, error) {
                        $("#maskDiv").hide();
                    },
                    complete: function () {
                    }
                });
            }
        }

    }
}

function onLineBankJuHuiBaoWangYinFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankJuHuiBaoWangYinFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankJuHuiBaoSaoMaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankJuHuiBaoSaoMaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankLiKeFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankLiKeFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYaFuNewFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYaFuNewFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankSuHuiBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankSuHuiBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}
function onLineBankYinShengFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYinShengFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShunFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShunFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


//快付小店

function onLineBankXunJieTongFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankXunJieTongFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


function onLineBankKuaiFuXiaoDianFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankKuaiFuXiaoDianFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


//易付
function onLineBankYiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankRuiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankRuiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}



//咕啦扫码
function onLineBankGuLaShaoMaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankGuLaShaoMaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}


function onLineBankMiaoFuNewFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankMiaoFuNewFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYunAnFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYunAnFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShenHaiXingFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShenHaiXingFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankLuoBoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankLuoBoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYunXunFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYunXunFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHaiDuoZhiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHaiDuoZhiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYuanBaoZhiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYuanBaoZhiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankPuFaFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankPuFaFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankBWMFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankBWMFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankShunFuAFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankShunFuAFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYiYouKuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYiYouKuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankQingYiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankQingYiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankDuoBaoFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankDuoBaoFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankHuiHeFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankHuiHeFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankQuanYinFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankQuanYinFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankYuYingFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankYuYingFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankCaiMaoKuaiFuFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankCaiMaoKuaiFuFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function onLineBankAoSiTeFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/onLineBankAoSiTeFormSubmit?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            //							location.href= data.linkPage; 
                            window.location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function getThirdPayChannel(memberVipLevel) {
    $("#channel").html("");
    var defaultChannel = "";
    var chtml = "";
    var o = {
        memberVipLevel: memberVipLevel
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getThirdPayChannel?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 20000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.channelList.length > 0) {
                        for (var i = 0; i < data.channelList.length; i++) {
                            var channelName = l_thirdPay_channel[data.channelList[i]];
                            if (i === 0) {
                                chtml += "<span id='" + data.channelList[i] + "' class='active' onclick='getThirdPayInfoForChannel(\"" + data.memberVipLevel + "\",\"" + data.channelList[i] + "\")'>" +
								"<img src='../images/all/thirdPay/" + data.channelList[i] + "_PAY.png'/>" + l_thirdPay_channel[data.channelList[i]] +
								"</span>";
                                defaultChannel = data.channelList[i];
                            } else {
                                chtml += "<span id='" + data.channelList[i] + "' onclick='getThirdPayInfoForChannel(\"" + data.memberVipLevel + "\",\"" + data.channelList[i] + "\")'>" +
								"<img src='../images/all/thirdPay/" + data.channelList[i] + "_PAY.png'/>" + l_thirdPay_channel[data.channelList[i]] +
								"</span>";
                            }
                        }
                        chtml += "<div class='clear'></div>";
                        $("#channel").html(chtml);

                        getThirdPayInfoForChannel(data.memberVipLevel, defaultChannel);
                    } else {
                        $("#channel").html("无可用支付通道，请联系在线客服...");
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function getThirdPayInfoForChannel(memberVipLevel, channel) {
    $("#thirdPayInfo").html("");
    var thtml = "";
    var o = {
        memberVipLevel: memberVipLevel,
        channel: channel
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getThirdPayInfoForChannel?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 20000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.tpInfoPosForchannel.length > 0) {
                        thtml += "<ul>";
                        for (var i = 0; i < data.tpInfoPosForchannel.length; i++) {
                            if (data.client === "PC") {
                                thtml += "<label><li><input type='radio' name='passage' />" + data.tpInfoPosForchannel[i].thirdTypeName + "</li></label>";
                            } else {
                                thtml += "<label><li><input type='radio' name='passage' />" + data.tpInfoPosForchannel[i].moblieName + "</li></label>";
                            }
                        }
                        thtml += "</ul>";
                        $("#thirdPayInfo").html(thtml);

                        $("#channel span").each(function () {
                            if ($(this).attr("id") === channel) {
                                $(this).attr("class", "active");
                            } else {
                                $(this).attr("class", "");
                            }
                        })
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function onLineBankThirdFormSubmit(form, status) {
    if (status) {
        var o = {};
        var a = $("#onLineBankForm").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                } o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var jsonuserinfo = $.toJSON(o);
        if (confirm(l_message['msg4'])) {
            $.ajax({
                type: "post",
                url: $("#path").val() + "/app/" + $("#submitMethod").val() + "?" + Math.random() * 10000,
                data: jsonuserinfo,
                contentType: 'application/json',
                dataType: "json",
                async: false,
                timeout: 50000,
                beforeSend: function (xmlhttprequest) {
                    $("#maskDiv").show();
                },
                success: function (data) {
                    if (data) {
                        if (data.success == true) {
                            location.href = data.linkPage;
                        } else {
                            if (data.message == 'SESSION_EXPIRED') {
                                JqueryShowMessageHome(l_basic['sessionExpired']);
                            } else if (data.message == 'STATUS_NO_OPEN') {
                                JqueryShowMessage(l_deposit['msg3']);
                            } else if (data.message == 'TRY_AGAIN') {
                                JqueryShowMessage(l_basic['tryAgain']);
                            } else if (data.message == 'DEMO') {
                                JqueryShowMessage(l_deposit['msg5']);
                            } else if (data.message == 'THIRD_CHANGED') {
                                JqueryShowMessageCloseWindow(l_deposit['msg6']);
                            }
                            $("#maskDiv").hide();
                        }
                    }
                },
                error: function (xmlhttprequest, error) {
                    $("#maskDiv").hide();
                },
                complete: function () {
                }
            });
        }
    }
}

function recallDeposit(oKorderNum) {
    var o = {
        oKorderNum: oKorderNum
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/recallDeposit?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#maskDiv").show();
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    location.reload();
                    $("#maskDiv").hide();
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageHome(l_basic['sessionExpired']);
                    } else if (data.message == 'MEMBERCRIDET_STATUS_SUCCESS') {
                        JqueryShowMessage(l_deposit['msg8']);
                    } else if (data.message == 'MEMBERCRIDET_STATUS_REJECTED') {
                        JqueryShowMessage(l_deposit['msg9']);
                    } else if (data.message == 'MEMBERCRIDET_STATUS_NO_PENDING') {
                        JqueryShowMessage(l_deposit['msg10']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else {
                        JqueryShowMessage(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, textStatus, error) {
            $("#maskDiv").hide();
        },
        complete: function () {
        }
    });
}

function showLink(obj) {
    if ($("#gw_" + obj.value).val().length > 0) {
        $("#bankLink").html("<a  target ='_blank' href='" + $("#gw_" + obj.value).val() + "'>" + l_BankOfficialWebsite['msg1'] + "</a>");
    } else {
        $("#bankLink").html("");
    }
}