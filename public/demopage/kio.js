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
	var meta = document.querySelector('meta[name="kio-verification"]');
	var baseurlmeta = document.querySelector('meta[name="kio-base-url"]')
	if (meta && baseurlmeta) {
		var id = meta.getAttribute('content');
		var baseUrl = baseurlmeta.getAttribute('content')
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
		let url;
		console.log(baseUrl)
		if (id !== "preview") {
			url = baseUrl + '/api/v1/modules/' + id + '/latest';
		} else {
			url = baseUrl + '/api/v1/modules/latest';
		}
		httpRequest.open(
			'GET',
			url
		);
		httpRequest.send();
	}
})();
