module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./reports/junit",
        outputName: "frontend-junit.xml",
      },
    ],
  ],
  testEnvironment: "jsdom",
};
