module.exports = function (api) {
  const isTest = process.env.NODE_ENV === 'test';
  api.cache(!isTest);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      // Worklets plugin replaces reanimated/plugin in reanimated v4; skip in Jest
      ...(isTest ? [] : ['react-native-worklets/plugin']),
    ],
  };
};
