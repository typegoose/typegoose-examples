import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';

/** A normal representation of a Cat in a database */
export class Cat {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public age!: number;
}

/** Model of {@link Cat} */
export const CatModel = getModelForClass(Cat);

/** Create a Cat in the database with the given values */
export async function addCat(name: string, age: number): Promise<DocumentType<Cat>> {
  return await CatModel.create({ name, age });
}
