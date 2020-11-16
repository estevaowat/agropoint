module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverage: true,
  testMatch: ['**.spec.ts'],
  modulePathIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules'],
};
