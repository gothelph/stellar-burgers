import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['<rootDir>/src/__tests__/**/*.(test|spec).(ts|tsx)'],

  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  collectCoverageFrom: [
    'src/services/store/**/*.{ts,tsx}',
    '!src/services/store/index.ts',
    '!src/**/*.d.ts'
  ]
};

export default config;
