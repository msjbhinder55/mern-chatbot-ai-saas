module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-results",
        outputName: "test-results.xml",
      },
    ],
  ],
  testEnvironment: "jsdom",
};
