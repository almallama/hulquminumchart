// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	//console.log("isOpera: " + isOpera);
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
	//console.log("isFirefox: " + isFirefox);
// At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isSafariOld = false;
	if (navigator.userAgent.indexOf("Safari/") > -1) {
		var arrBr = navigator.userAgent.split("Safari/");
		if (arrBr[1].length > 0) {
			var arrBrVer = arrBr[1].split(".");
			if (arrBrVer[0].length > 0) {
				if (Number(arrBrVer[0]) < 535) {
					isSafariOld = true;
				}
			}
		}
	}
	//console.log("isSafari: " + isSafari);
	//console.log("isSafariOld: " + isSafariOld);
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
	//console.log("isIE: " + isIE);
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
	//console.log("isEdge: " + isEdge);
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
	//console.log("isChrome: " + isChrome);
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
	//console.log("isBlink: " + isBlink);
// Yandex engine detection
var isYa = (isChrome && isBlink) && (navigator.userAgent.indexOf("YaBrowser") > -1 || navigator.userAgent.indexOf("Yowser") > -1);
	//console.log("isYa: " + isYa);
// Brave detection
var isBrave = false;
if (!isOpera && !isFirefox && !isSafari && !isIE && !isEdge && !isChrome && !isBlink && !isYa && navigator.userAgent.indexOf("AppleWebKit") > -1) {
	isBrave = true;
	//console.log("isBrave: " + isBrave);
}
// Baidu detection
var isBaidu = false;
if (!isOpera && !isFirefox && !isSafari && !isIE && !isEdge && !isBrave && !isYa && isChrome && navigator.userAgent.indexOf("Chrome/6") == -1) {
	isBaidu = true;
	//console.log("isBaidu: " + isBaidu);
}
// Konqueror detection
var isKonq = false;
if (!isOpera && !isFirefox && !isSafari && !isIE && !isEdge && !isChrome && !isBlink && !isYa && !isBrave && navigator.userAgent.indexOf("KHTML") > -1) {
	isKonq = true;
	//console.log("isKonq: " + isKonq);
}
// UCBrowser detection
var isUCBr = false;
if (isChrome && isBlink && isBaidu && navigator.userAgent.indexOf("UBrowser") > -1) {
	isUCBr = true;
	//console.log("isUCBr: " + isUCBr);
}
// Opera Neon detection
var isOprN = false;
if (isChrome && isBlink && isBaidu && navigator.userAgent.indexOf("MMS") > -1) {
	isOprN = true;
	//console.log("isOprN: " + isOprN);
}

	//console.log("navigator.userAgent: " + navigator.userAgent);
	//console.log("navigator.userAgent.indexOf('AppleWebKit'): " + navigator.userAgent.indexOf("AppleWebKit"));
	//console.log("navigator.doNotTrack: " + navigator.doNotTrack);
	//console.log("navigator.oscpu: " + navigator.oscpu);
	//console.log("navigator.appName: " + navigator.appName);
	//console.log("navigator.appVersion: " + navigator.appVersion);
	//console.log("navigator.appCodeName: " + navigator.appCodeName);
	//console.log("navigator.platform: " + navigator.platform);

var d = new Date();
var n = d.getFullYear(); 
