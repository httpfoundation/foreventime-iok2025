const webpack = require('webpack');
/* eslint-disable react-hooks/rules-of-hooks */
const {
  useBabelRc,
  addWebpackResolve,
  override,
  addWebpackPlugin,
  addWebpackAlias,
} = require('customize-cra');
/*
module.exports = function override(config, env) {
	//do stuff with the webpack config...

	config.resolve.fallback = {
		http: require.resolve('http-browserify'),
		https: require.resolve('https-browserify'),
		os: require.resolve('os-browserify/browser'),
		zlib: require.resolve("browserify-zlib"),
		path: require.resolve("path-browserify"),
		querystring: require.resolve("querystring-es3"),
		url: require.resolve("url/"),
		assert: require.resolve("assert/"),
		stream: require.resolve("stream-browserify"),
		crypto: require.resolve("crypto-browserify"),
		fs: false
	};
	config.plugins.push(
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	);

	return config;
}
*/

const resolve = {
  fallback: {
    http: require.resolve('http-browserify'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    zlib: require.resolve('browserify-zlib'),
    path: require.resolve('path-browserify'),
    querystring: require.resolve('querystring-es3'),
    url: require.resolve('url/'),
    assert: require.resolve('assert/'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    fs: false,
  },
};

const overridePlugin = new webpack.ProvidePlugin({
  process: 'process/browser',
  Buffer: ['buffer', 'Buffer'],
});

const alias = {
  process: 'process/browser',
};
module.exports = override(
  addWebpackPlugin(overridePlugin),
  addWebpackAlias(alias),
  useBabelRc(),
  addWebpackResolve(resolve),
);
