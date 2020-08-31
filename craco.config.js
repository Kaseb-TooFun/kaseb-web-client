const CracoAlias = require("craco-alias");

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: "tsconfig",
				baseUrl: "./src",
				tsConfigPath: "./tsconfig.extend.json",
			},
		},
	],
	eslint: {
		enable: false,
	},
	devServer: {
		proxy: {
			"/api": {
				target: "https://api.mykaseb.ir",
				secure: true,
				changeOrigin: true,
				logLevel: "info",
			},
		},
	},
};
