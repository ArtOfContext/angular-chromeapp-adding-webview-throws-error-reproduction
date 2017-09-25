setTimeout(function() {
	var webview = document.createElement('webview');
	document.getElementById('container1').appendChild(webview);
	webview.src = 'http://www.google.com';
});

document.getElementById('b1').addEventListener("click", function() {
	var webview = document.createElement('webview');
	document.getElementById('container2').appendChild(webview);
	webview.src = 'http://www.google.com';
});

