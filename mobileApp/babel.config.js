module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "react-native-dotenv",
      "path": ".env",
    }]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
