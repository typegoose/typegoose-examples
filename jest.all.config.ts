import type { Config } from 'jest';
import BaseConfig from './jest.base.config';

const config: Config = {
  ...BaseConfig,
  projects: ['<rootDir>/examples/*'],

  // the following has to be re-defined because jest checks these values once for the actual workspace "rootDir" and also in each project
  globalSetup: '<rootDir>/base-helpers/globalSetup.ts', // only runs once before all projects
  globalTeardown: '<rootDir>/base-helpers/globalTeardown.ts', // only runs once after all projects
  setupFilesAfterEnv: ['<rootDir>/base-helpers/setupFile.ts'], // required to be present and a actual file in (workspace)"rootDir", but is executed from the projects definition (./test/utils)
};

export default config;
