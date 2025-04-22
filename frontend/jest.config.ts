import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
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
};

export default config;
