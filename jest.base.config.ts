import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        diagnostics: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/build/'],
  testRegex: '.test.ts$',
  // collectCoverage: false,
  // collectCoverageFrom: ['**/src/**/*.ts', '!**/*.{test.ts,d.ts,js}'],
  // coverageDirectory: './coverage',
  // maxConcurrency: 2,
  globalSetup: '<rootDir>/test/utils/globalSetup.ts',
  globalTeardown: '<rootDir>/test/utils/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/utils/setupFile.ts'],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
};

export default config;
