import { User, UserModel } from '../src/models';
import { clearData } from './utils/connect';

describe('Plugin @typegoose/auto-increment', () => {
  beforeAll(async () => {
    await clearData();
  });

  beforeEach(async () => {
    await UserModel.deleteMany();
  });

  type Helper<V> = V & { [key: string]: any };

  it('should create users with incrementing signup-id and store modified amount', async () => {
    // using "ordered" to ensure the insertion order is the definition order
    const docs = await UserModel.create([{ name: 'Luke' }, { name: 'Joe' }, { name: 'Linus' }], { ordered: true });

    expect(docs[0]).toMatchObject<Helper<User>>({
      name: 'Luke',
      signupID: 0,
      updatedCount: 0,
    });
    expect(docs[1]).toMatchObject<Helper<User>>({
      name: 'Joe',
      signupID: 1,
      updatedCount: 0,
    });
    expect(docs[2]).toMatchObject<Helper<User>>({
      name: 'Linus',
      signupID: 2,
      updatedCount: 0,
    });

    docs[1].name = 'Joe Smith';
    await docs[1].save();

    const found = await UserModel.find({}); // find all

    expect(found.find((v) => v.name === 'Luke')).toMatchObject<Helper<User>>({
      name: 'Luke',
      signupID: 0,
      updatedCount: 0,
    });
    expect(found.find((v) => v.name === 'Joe Smith')).toMatchObject<Helper<User>>({
      name: 'Joe Smith',
      signupID: 1,
      updatedCount: 1,
    });
    expect(found.find((v) => v.name === 'Linus')).toMatchObject<Helper<User>>({
      name: 'Linus',
      signupID: 2,
      updatedCount: 0,
    });
  });
});
