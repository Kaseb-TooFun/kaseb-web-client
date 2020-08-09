(function () {
	var addScript = function (t) {
		var script = document.createElement('script');
		var head = document.head || document.getElementsByTagName('head')[0];
		script.async = 1;
		script.src = t;
		head.appendChild(script);
	};
	var meta = document.querySelector('meta[name="kio-verification"]');
	if (meta) {
		var id = meta.getAttribute('content');
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
