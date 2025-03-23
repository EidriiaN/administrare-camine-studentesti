const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Add fallback for Node.js modules
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
    assert: require.resolve("assert"),
    http: false, // Add this if you encounter issues with `http`
    https: false, // Add this if you encounter issues with `https`
    os: false, // Add this if you encounter issues with `os`
    url: false, // Add this if you encounter issues with `url`
  };
  return config;
};
