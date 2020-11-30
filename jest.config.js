module.exports = {
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "client"],
  transform: {
    "^.+\\.jsx?$": "./custom-transformer.js",
  },
};
