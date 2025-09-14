module.exports = {
  testEnvironment: "node",
  verbose: true,
  roots: ["<rootDir>/unit", "<rootDir>/integration"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["../src/**/*.js"], // adjust path to your source
  coverageDirectory: "<rootDir>/coverage",
};
