(function () {
	var addScript = function (t) {
		var script = document.createElement('script');
		var head = document.head || document.getElementsByTagName('head')[0];
		script.async = 1;
		script.src = t;
		head.appendChild(script);
	};
	var addCss = function (t) {
		var link = document.createElement('link');
		var head = document.head || document.getElementsByTagName('head')[0];
		link.href = t;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	};
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function (event) {
		if (
			XMLHttpRequest.DONE == event.target.readyState &&
			event.target.status == 200
		) {
			var res = event.target.responseText;
			if (res != '') {
				try {
					var config = JSON.parse(res);
					addScript(config.url);
					addCss(config.style);
				} catch (error) {}
			}
		}
	};
	var baseUrl = window.localStorage.getItem('REACT_APP_BASE_URL');
	httpRequest.open('GET', baseUrl + '/api/v1/modules/latest');
	httpRequest.send();
})();
