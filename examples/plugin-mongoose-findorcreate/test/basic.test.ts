import { UserModel } from '../src/models';
import { clearData } from './utils/connect';

describe('Plugin mongoose-findorcreate', () => {
  beforeAll(async () => {
    await clearData();
  });

  beforeEach(async () => {
    await UserModel.deleteMany();
  });

  it('should create if not existing', async () => {
    expect(await UserModel.countDocuments()).toStrictEqual(0);

    const res = await UserModel.findOrCreate({ name: 'helloNonExisting' });

    expect(await UserModel.countDocuments()).toStrictEqual(1);
    expect(res.created).toStrictEqual(true);
    expect(res.doc.age).toStrictEqual(undefined);
  });

  it('should find if existing', async () => {
    expect(await UserModel.countDocuments()).toStrictEqual(0);

    await UserModel.create({ name: 'helloExisting', age: 20 });

    const res = await UserModel.findOrCreate({ name: 'helloExisting' });

    expect(await UserModel.countDocuments()).toStrictEqual(1);
    expect(res.created).toStrictEqual(false);
    expect(res.doc.age).toStrictEqual(20);
  });
});
