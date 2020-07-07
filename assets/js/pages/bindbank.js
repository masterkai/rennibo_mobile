var PLAYER_DEPOSIT_BANK_LIST;

$(function () {
    $('.container_depocash #depo_manual_bank').change(function () {
        BindDepositBankInfo();
    });

    $('.btnSaveBank').click(function () {

        //if (!Confirm()) return false;

        //var form = $('form[name=form_savebank')[0];
        //var formData = new FormData(form);
        var param = {
            ddl_bank: $('.container_bindbank #ddl_bank').val(),
            ply_bankname: $('.container_bindbank #ply_bankname').val(),
            ply_bankacc: $('.container_bindbank #ply_bankacc').val(),
        };
        var error_msg = "";

        showLoading();
        $.ajax(
        {
            url: "/handlers/SaveBank.ashx",
            type: 'POST',
            data: JSON.stringify(param),
            cache: false,
            contentType: false,
            processData: false,
            success: function(e) {
                var o = JSON.parse(e);
                closeLoading();
                if (o) {
                    var code = o.code;
                    if (code == 0) {
                        alertMSGCallback(o.msg, ShowWithdrawForm);
                    } else {
                        alertMSG(o.msg);
                    }
                }
            },
            error: function(xhr, status, error) {
                //var err = eval("(" + xhr.responseText + ")");
                //alert(err.Message);
            },
            complete: function() {
                closeLoading();
            }
        });
    });
});

GetBindBankList = function () {
    $.ajax(
    {
        url: "/handlers/GetBindBankList.ashx",
        type: 'POST',
        cache: false,
        async: true,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (result) {
            var o = result;
            var code = o.code;
            switch (code) {
                case 0:
                    if (o.data) {
                        //clear dropdown
                        $(".container_bindbank #ddl_bank").find('option').not(':first').remove();
                        var json = JSON.parse(o.data);
                        $.each(json, function (key, item) {
                            $(".container_bindbank #ddl_bank").append($("<option></option>").val(item.ID).html(item.BankName));
                        });
                        $(".container_bindbank #ply_bankname, .container_bindbank #ply_bankacc").val(null);
                    }
                    break;
                case 592:
                    location.href = '/';
                    break;
            }
        },
        error: function (e) {
        },
        complete: function() {
            closeLoading();
        }
    });
}

BindDepositBank = function () {
    $.ajax(
    {
        url: "/handlers/BindDepositBank.ashx",
        type: 'POST',
        cache: false,
        async: true,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (result) {
            var o = result;
            var code = o.code;
            switch (code) {
                case 0:
                    if (o.data) {
                        var json = JSON.parse(o.data);

                        PLAYER_DEPOSIT_BANK_LIST = json;

                        var ddl = $("#depo_manual_bank");

                        $(ddl).find('option[value!="0"]').remove();

                        $.each(json, function (key, item) {
                            var bankaccount = item.BankName;
                            //alert(bankaccount);
                            $("#depo_manual_bank").append($("<option></option>").val(item.ID).html(bankaccount));
                        });

                        var cnt = json.length;
                        if (cnt <= 1) {
                            $(ddl).val($(ddl).find("option:eq(1)").val()).trigger('change');
                            $(ddl).addClass('readonly').css("pointer-events", "none");
                        } else {
                            $(ddl).removeClass('readonly').css("pointer-events", "");
                        }
                    }
                    break;
                case 592:
                    location.href = '/mobile/mDeposit_cash.aspx';
                    break;
            }
        },
        error: function (e) {
        }
    });
}


BindDepositBankInfo = function () {
    var data = PLAYER_DEPOSIT_BANK_LIST;

    var bankNo = $('.container_depocash #depo_manual_bank').val();
    //console.log('123');

    if (bankNo > 0) {
        var bankObj = data.filter(
            function (data) { return data.ID == bankNo }
        );
        if (bankObj) {
            var accountName = bankObj[0].AccountName;
            var accountNumber = bankObj[0].AccountNumber;
            $('.container_depocash #depo_manual_bankaccname').val(accountName);
            $('.container_depocash #depo_manual_bankaccnum').val(accountNumber);

            $('.div_depo_manual_bankaccname').show();
            $('.div_depo_manual_bankaccnum').show();
            //console.log('123show');
        }
    } else {
        //console.log('123close');
        $('.container_depocash #depo_manual_bankaccname').val(null);
        $('.container_depocash #depo_manual_bankaccnum').val(null);
        $('.div_depo_manual_bankaccname').hide();
        $('.div_depo_manual_bankaccnum').hide();

    }
}