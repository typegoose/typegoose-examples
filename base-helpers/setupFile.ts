import { connect, disconnect } from './connect';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
