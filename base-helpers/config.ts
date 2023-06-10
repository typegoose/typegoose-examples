import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

/**
 * All Properties the config has to set
 */
interface IConfig {
  /** Specify whether to use a in-memory (mongodb-memory-server) instance or the defined values for connecting to a specific instance */
  Memory: boolean;
  /** Which database name to use for all tests */
  DataBase: string;
  /** Specify which port to use for external instances */
  Port: number;
  /** Specify Authentication for external instances */
  Auth: IAuth;
  /** Specify which ip to use for external instances */
  IP: string;
}

/** Specify Authentication for external instances */
interface IAuth {
  User: string;
  Passwd: string;
  DB: string;
}

enum EConfig {
  MONGODB_IP = 'MongoDB IP is not specified!',
  MONGODB_DB = 'MongoDB DataBase is not specified!',
  MONGODB_PORT = 'MongoDB Port is not specified!',
  MONGODB_AUTH = 'You should activate & use MongoDB Authentication!',
}

/** Alias for "process.env" */
const env: NodeJS.ProcessEnv = process.env;

/** Get the project root from git */
const projectRoot = execSync('git rev-parse --show-toplevel').toString().trimEnd();

// warn if the path gotten from git does not actually exist (it should exist because it is a git repository)
if (!fs.existsSync(projectRoot)) {
  console.error(`Could not determine project root from git, found: "${projectRoot}"`);
}

/** Path to the config to use */
const configPath: string = env.CONFIG ?? path.join(projectRoot, './config.json');

// write a default config
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(
    configPath,
    JSON.stringify({
      Memory: true,
      DataBase: 'typegooseTest',
      Port: 27017,
      Auth: {
        DB: '',
        User: '',
        Passwd: '',
      },
      IP: 'localhost',
    } as IConfig)
  );
}

/** The config read raw from the path and parsed into json */
const configRAW: Readonly<IConfig> = JSON.parse(fs.readFileSync(configPath).toString());

/**
 * The actual final config, properly combined
 * Priorities:
 * ENV || CONFIG-FILE || DEFAULT
 */
const configFINAL: Readonly<IConfig> = {
  Memory: env.C_USE_IN_MEMORY !== undefined || (typeof configRAW.Memory === 'boolean' ? configRAW.Memory : true),
  DataBase: env.C_DATABASE ?? configRAW?.DataBase ?? 'typegooseTest',
  Port: parseInt(env.C_PORT as string, 10) || configRAW.Port || 27017,
  Auth: {
    User: env.C_AUTH_USER ?? configRAW?.Auth?.User ?? '',
    Passwd: env.C_AUTH_PASSWD || configRAW?.Auth?.Passwd || '',
    DB: env.C_AUTH_DB || configRAW?.Auth?.DB || '',
  },
  IP: env.C_IP ?? configRAW.IP ?? 'localhost',
};

/** Small callback to reduce code size and not repeat yourself */
function exitProcess(text: string): void {
  console.error(text);
  process.exit(-1);
}

// sanity check that all values properly exist when not using in-memory
if (!configFINAL.Memory) {
  if (!configFINAL.IP) {
    exitProcess(EConfig.MONGODB_IP);
  }
  if (!configFINAL.DataBase) {
    exitProcess(EConfig.MONGODB_DB);
  }
  if (!configFINAL.Port) {
    exitProcess(EConfig.MONGODB_PORT);
  }
}

export { configFINAL as config };
