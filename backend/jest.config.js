module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  sourceMap: false,
  typeRoots: ['node_modules/@types', 'src/@types'],
  exclude: ['node_modules', 'out', '.next'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverage: true,
  testMatch: ['**/*.spec.ts'],
};
