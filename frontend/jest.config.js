module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "test-results", outputName: "test-results.xml" },
    ],
  ],
};
