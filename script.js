/**
 * Created by Gary on 6/10.
 */
$(document).ready(function () {
	//show now time
	function renewTime() {
		var now = new Date(),
			h = now.getHours(),
			hh = (h < 10 ? '0' : '') + h,//前面補0
			mm = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
//            ss = now.getSeconds();
		document.getElementById('clock').innerHTML = hh + ':' + mm;

        //根據時間設定背景圖片
		if (h >= 17 && h <= 19){//傍晚
		    $('body').css({'background-image':'url("https://source.unsplash.com/collection/977392/1920x1080")'});
        } else if (h >= 20 && h <= 23){//晚上
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else if (h >= 0 && h < 4){//晚上
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/991244/1920x1080")'});
        } else {//白天
            $('body').css({'background-image':'url("https://source.unsplash.com/collection/974604/1920x1080")'});
        }
    }
	setInterval(renewTime, 1000);//update every second

    var u = window.location.href;
    if (u.indexOf('?') === -1){//沒有塞參數
        window.location.href = u + '?timer=0:0&bgm=0';//參數預設值
    } else {
        var setting = u.split('?')[1],
            timer = setting.split('&')[0],
            timerValue = timer.split('=')[1],
            focusMin = parseInt(timerValue.split(':')[0]),
            relaxMin = parseInt(timerValue.split(':')[1]),
            focusCountdown = focusMin * 60,//分鐘數轉秒數
            relaxCountdown = relaxMin * 60,
            focusCountdownId,
            relaxCountdownId,
            x,
            y;
        if (focusMin === 0){
            $('#counterDisplay').hide();
        } else {
            initialFocusCountdown();
        }
    }

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

	function customAlert(bgColor, textColor, text) {//提示效果
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

//處理按鍵輸入的事件
$('input').keypress(function(event){
    var searchTerm = $('#search').val();
	if (event.altKey && event.which === 13) {// Enter 鍵的號碼是 13
        window.location.href = 'http://www.google.com/search?btnI&q=' + searchTerm;//好手氣
    } else if (event.which === 13) {
        var u = window.location.href,
            setting = u.split('?')[1];
	    if (searchTerm === '#play'){//用指令播放 BGM
            window.location.href = u.split('?')[0] + '?' + setting.replace('bgm=0','bgm=1');
        }if(searchTerm === '#stop'){//用指令停止 BGM
            window.location.href = u.split('?')[0] + '?' + setting.replace('bgm=1','bgm=0');
		} else if (searchTerm.indexOf('#timer=') != -1){//用指令開啟計時器
	        var timer = searchTerm.split('#')[1];
            window.location.href = u.split('?')[0] + '?' + timer + setting.split('&')[1];
        } else {
            window.location.href = 'http://www.google.com/search?q=' + searchTerm;
        }
	}
});