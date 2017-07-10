/**
 * Created by Gary on 6/10.
 */
$(document).ready(function () {

	//show now time
	function renewTime() {
		var now = new Date(),
			hh = (now.getHours() < 10 ? '0' : '') + now.getHours(),//前面補0
			mm = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
//            ss = now.getSeconds();
		document.getElementById('clock').innerHTML = hh + ':' + mm;

		if (now.getHours() === 17) {
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/977392/1920x1080")'});
        } else if (now.getHours() > 17 && now.getHours() < 19){
		    $('body').css({'background-image':'url("https://source.unsplash.com/collection/977392/1920x1080")'});
        } else if (now.getHours() === 19){
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else if (now.getHours() > 19 && now.getHours() < 23){
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else if (now.getHours() === 23 || now.getHours() === 0){
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else if (now.getHours() > 0 && now.getHours() < 4){
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else {
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/974604/1920x1080")'});
        }
    }
	setInterval(renewTime, 1000);//update every second

	//get setting from url
	var u = window.location.href,
		setting = u.split('?', 2)[1],
		focusMin = parseInt(setting.split('&', 2)[0]),
		relaxMin = setting.split('&', 2)[1],
		focusCountdown = focusMin * 60,//分鐘數轉秒數
		relaxCountdown = relaxMin * 60,
		focusCountdownId,
		relaxCountdownId,
		x,
		y;

	function initialFocusCountdown() {
		x = document.getElementById("focusCountdown");
		x.innerHTML = '專注&nbsp;' + focusMin + ':00';
		focusCountdown--;
		focusCountdownId = window.setInterval(focusCountdownFunc, 1000);
	}

	function focusCountdownFunc() {
		var leftFocusM = Math.floor(focusCountdown / 60),
			leftFocusS = focusCountdown - leftFocusM * 60;
		x.innerHTML = '專注&nbsp;' + leftFocusM + ':' + leftFocusS;
		if (focusCountdown === 3) {
			customAlert('#fff', '#000', '該休息囉～');
			setTimeout(function () {
				clearInterval(focusCountdownId);
				document.getElementById('focusCountdown').style.display = 'none';
				initialRelaxCountdown();
			}, 3000);
		}
		focusCountdown--;
	}

	initialFocusCountdown();

	function initialRelaxCountdown() {
		y = document.getElementById("relaxCountdown");
		y.innerHTML = '休息&nbsp;' + relaxMin + ':00';
		relaxCountdown--;
		relaxCountdownId = window.setInterval(relaxCountdownFunc, 1000);
	}

	function relaxCountdownFunc() {
		var leftRelaxM = Math.floor(relaxCountdown / 60),
			leftRelaxS = relaxCountdown - leftRelaxM * 60;
		y.innerHTML = '休息&nbsp;' + leftRelaxM + ':' + leftRelaxS;
		if (relaxCountdown === 3) {
			customAlert('#000', '#fff', '該工作囉～');
			setTimeout(function () {
				clearInterval(relaxCountdownId);
			}, 3000);
		}
		relaxCountdown--;
	}

	function customAlert(bgColor, textColor, text) {
		$('#customAlert').css({'background-color': bgColor, 'color': textColor}).html('<p>' + text + '</p>');
		if (navigator.vibrate) {
			navigator.vibrate(1000);
		} else if (navigator.webkitVibrate) {
			navigator.webkitVibrate(1000);
		}
		function flash() {
			$('#mainContent').fadeOut(500);
			$('#customAlert').fadeIn(500).fadeOut(500);
		}

		var flashId = window.setInterval(flash, 500);
		setTimeout(function () {
			clearInterval(flashId);
		}, 3000);

		setTimeout(function() {
			$('#mainContent').fadeIn(500);
		}, 6000);
	}
	$(document).on('keypress', function() {
		$('#search').focus();
	});
});

$('input').keypress(function(event){
    var searchTerm = $('#search').val();
	if (event.which === 13) {// shift + Enter 鍵的號碼是 13
        window.location.href = 'http://www.google.com/search?q=' + searchTerm;
    } else if (event.altKey && event.which === 13) {//alt + Enter 好手氣
        window.location.href = 'http://www.google.com/search?btnI&q=' + searchTerm;
	}
});