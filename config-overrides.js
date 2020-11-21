const {
	override,
	fixBabelImports,
	disableEsLint,
	addWebpackModuleRule,
	useBabelRc,
	overrideDevServer
} = require('customize-cra');
const path = require('path');
const fs = require('fs');

const devConfigServer = () => (config) => {
	return {
		...config,
		port: 3000,
		// http2: true,
		// https: {
		// 	key: fs.readFileSync('~/Coding/192.168.8.192-key.pem'),
		// 	cert: fs.readFileSync('~/Coding/192.168.8.192.pem'),
		// 	// ca: fs.readFileSync('~/Coding/192.168.8.192-tc.crt')
		// },
		proxy: {
			'/api': {
				target: 'https://api.mykaseb.ir/api/',
				pathRewrite: { '^/api': '' },
				secure: true,
				ws: false,
				changeOrigin: true,
				onProxyReq: (proxyReq, req, res) => {
					proxyReq.setHeader('origin', 'https://app.mykaseb.ir');
				},
				onProxyRes: (proxyRes, req, res) => {
					proxyRes.headers['access-control-allow-methods'] = '*';
					proxyRes.headers['access-control-allow-headers'] = '*';
					proxyRes.headers['access-control-allow-origin'] = '*';
				}
			}
		}
	};
};

module.exports = {
	webpack: override(
		useBabelRc(),
		disableEsLint(),
		fixBabelImports('lodash', {
			libraryName: 'lodash',
			libraryDirectory: '',
			camel2DashComponentName: false
		}),
		addWebpackModuleRule({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})
	),
	devServer: overrideDevServer(devConfigServer())
};