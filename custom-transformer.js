const babelJest = require("babel-jest");
const babelOptions = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
        exclude: ["transform-regenerator"],
      },
    ],
    "@babel/react",
  ],
  babelrc: false,
};
module.exports = babelJest.createTransformer(babelOptions);
