import { CatModel, addCat } from '../src/app';
import { mongoose } from '@typegoose/typegoose';

describe('Basic Suite', () => {
  it('should work', async () => {
    expect(await CatModel.countDocuments()).toStrictEqual(0);
    const added = await addCat('Nyan', 1);
    expect(added).toBeInstanceOf(mongoose.Document);
    expect(await CatModel.countDocuments()).toStrictEqual(1);
  });
});
