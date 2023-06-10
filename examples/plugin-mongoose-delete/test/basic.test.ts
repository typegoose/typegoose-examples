import { User, UserModel } from '../src/models';
import { clearData } from './utils/connect';

describe('Plugin mongoose-delete', () => {
  beforeAll(async () => {
    await clearData();
  });

  beforeEach(async () => {
    await UserModel.deleteMany();
  });

  type Helper<V> = V & { [key: string]: any };

  it('should soft-delete entries', async () => {
    const docs = await UserModel.create([{ name: 'Luke' }, { name: 'Joe' }, { name: 'Linus' }]);

    expect(docs[0]).toMatchObject<Helper<User>>({
      name: 'Luke',
      deleted: false,
    });
    expect(docs[1]).toMatchObject<Helper<User>>({
      name: 'Joe',
      deleted: false,
    });
    expect(docs[2]).toMatchObject<Helper<User>>({
      name: 'Linus',
      deleted: false,
    });

    // delete a document via the plugin's functions
    await docs[1].delete();

    const found = await UserModel.find({}); // find all

    expect(found.find((v) => v.name === 'Luke')).toMatchObject<Helper<User>>({
      name: 'Luke',
      deleted: false,
    });
    expect(found.find((v) => v.name === 'Joe')).toMatchObject<Helper<User>>({
      name: 'Joe',
      deleted: true,
      deletedAt: expect.any(Date),
    });
    expect(found.find((v) => v.name === 'Linus')).toMatchObject<Helper<User>>({
      name: 'Linus',
      deleted: false,
    });

    // resotre that document via the plugin's functions
    await docs[1].restore();

    const foundJoe = (await UserModel.findById(docs[1]._id).orFail()).toObject();

    expect(foundJoe).toMatchObject<Helper<User>>({
      name: 'Joe',
      deleted: false,
    });
    expect(foundJoe).not.toHaveProperty('deletedAt');
  });
});
