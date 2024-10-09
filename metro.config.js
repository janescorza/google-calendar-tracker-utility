const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  transformer: {
    babelTransformerPath: require.resolve("metro-react-native-babel-transformer"),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
  },
};
