module.exports = function(config) {
  config.set({
    basePath: "./",
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "src/**/*.ts"
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    plugins: [
      require("karma-jasmine"),
      require("karma-spec-reporter"),
      require("karma-typescript"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter")
    ],
    karmaTypescriptConfig: {
      compilerOptions: {
        module: "commonjs"
      },
      tsconfig: "./tsconfig.json",
    },
  });
};