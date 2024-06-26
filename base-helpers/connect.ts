import * as mongoose from 'mongoose';
import { config } from './config';

interface ExtraConnectionConfig {
  dbName?: string;
  createNewConnection?: boolean;
  differentMongoose?: mongoose.Mongoose;
}

// to not duplicate code
const staticOptions: mongoose.ConnectOptions = {
  autoIndex: true,
};

/**
 * Make a Connection to MongoDB
 */
export async function connect(extraConfig: ExtraConnectionConfig = {}): Promise<mongoose.Connection> {
  const mongooseInstance: mongoose.Mongoose = extraConfig.differentMongoose ?? mongoose;
  let connection: mongoose.Connection;

  const options = Object.assign({}, staticOptions);

  if (config.Memory) {
    if (config?.Auth?.User?.length > 0) {
      Object.assign(options, {
        user: config.Auth.User,
        pass: config.Auth.Passwd,
        authSource: config.Auth.DB,
      });
    }
  }

  // ensure all test suites get a different database when not using a explicit database
  const dbName = extraConfig.dbName ?? config.DataBase + process.env.JEST_WORKER_ID;

  // to not duplicate code
  const connectionString = `${process.env.MONGO_URI}/${dbName}`;

  if (extraConfig.createNewConnection) {
    connection = await mongooseInstance.createConnection(connectionString, options).asPromise();
  } else {
    await mongoose.connect(connectionString, options);
    connection = mongooseInstance.connection;
  }

  return connection;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
  await mongoose.disconnect();

  return;
}

/**
 * Clear all data for the current connection
 * @param con Optionally specify which connection to use
 */
export async function clearData(con?: mongoose.Connection): Promise<void> {
  con = con ?? mongoose.connection;

  await Promise.all(Object.values(con.models).map((v) => v.collection.drop()));
}
