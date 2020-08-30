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
	var script = Array.from(document.scripts)
		.map(function (item) {
			return item.src;
		})
		.find(function (src) {
			return (src || '').indexOf('kio.js?id=') != -1;
		});
	if (script) {
		var id = script.replace(/(.*)id=/, '');
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
		httpRequest.open(
			'GET',
			'__BASE_URL__/api/v1/modules/' + id + '/latest'
		);
		httpRequest.send();
	}
})();
