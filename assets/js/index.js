$(function(){
	$('.content-top-login-tabs > div').bind('click', function(){
		$('.content-top-login-tabs > div').removeClass('current');
		$(this).addClass('current');
		if($(this).attr('frm') != 'access-login-ecp') {
			$('#login-certificate-list').hide();
		}
		$('.content-top-login-form form').css({display: 'none'});
		$('.content-top-login-form form#' + $(this).attr('frm')).css({display: 'block'});
	});
	$('#autoCompl').bind('click',function(){
		if($('#login-certificate-list') != 'undefined') {
			$('#login-certificate-list').show();
		}
	});

	var addedCapicomOptions = false;
	$('<div>').attr({id: 'login-certificate-list'}).appendTo(document.body);
	$('#login-certificate').combobox({
		appendTo: '#login-certificate-list',
		callbackChange: function(event, ui){
			setTimeout(function(){
				if (event.target.createTextRange) {
					var r = event.target.createTextRange();
					r.collapse(true);
					r.moveEnd("character", -1);
					r.select();
				}
				$(document.body).focus();
			}, 0);
		},
		optionReplaceTo: '$1'
	});

	$('div.login-certificate input.ui-autocomplete-input')
		.attr('readonly', 'readonly')
		.focus(function(){
			$('select#login-certificate').focus();
    });

    $('div.content-top-login-tabs div[frm=access-login-ecp]').bind('click', function() {
        if (!checkIfSupportedBrowser()) {
            bootbox.dialog({
                message: "Внимание! Для корректной работы системы требуется установить браузер Internet Explorer версии не ниже 8.0 или Google Chrome.",
                title: "ЭТП ММВБ «Госзакупки»",
                buttons: {
                    main: {
                        label: "Вернуться",
                        className: "btn-primary",
                        callback: function() {
                            bootbox.hideAll();
                        }
                    }
                }
            });
        }
        if (addedCapicomOptions == false) {
            loadCertificate();
            addedCapicomOptions = true;
        }
    });

	$('#auction-catalog-search').bind('keyup', function () {
		if ($(this).val() != '') {
			$('#auction-catalog-cross').fadeIn('fast', function () {
				$('#auction-catalog-search').width('84%');
			});
		} else {
			$('#auction-catalog-search').width('88%');
			$('#auction-catalog-cross').fadeOut('fast');
		}
	});
	
	$('#auction-catalog-cross').bind('click', function () {
		$('#auction-catalog-search').val('');
		$('#auction-catalog-search').width('88%');
		$('#auction-catalog-cross').fadeOut('fast');
	});
	
	var search = function () {
		window.location = $('#auction-catalog-form').attr('action') + '?q=' + urlencode($('#auction-catalog-search').val() + '&simple-search=Найти/');
		return false;
	};
	
	$('#auction-catalog-button').bind('click', search);
	$('#auction-catalog-form').bind('submit', search);
});