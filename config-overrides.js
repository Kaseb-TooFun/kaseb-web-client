const {
	override,
	useBabelRc,
	fixBabelImports,
	// disableEsLint,
	overrideDevServer,
	addWebpackModuleRule
} = require('customize-cra');
const path = require('path');
const fs = require('fs');

const disableEsLint = () => (config) => {
	config.plugins = config.plugins.filter(
		(plugin) =>
			!(
				(plugin.options && plugin.options.eslintPath) ||
				plugin.constructor.name === 'ESLintWebpackPlugin'
			)
	);
	return config;
};

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
			'/dev-api': {
				target: 'https://devapi.kaseb.xyz/',
				pathRewrite: { '^/dev-api': '' },
				secure: true,
				ws: false,
				changeOrigin: true,
				onProxyReq: (proxyReq, req, res) => {
					proxyReq.setHeader('origin', 'https://dev.kaseb.xyz/');
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
