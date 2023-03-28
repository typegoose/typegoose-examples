import { DocumentType, getModelForClass, plugin, prop } from '@typegoose/typegoose';
import mongoose, { FilterQuery } from 'mongoose';
import * as findorcreate from 'mongoose-findorcreate';

/**
 * Result for the `findOrCreate` function from mongoose-findorcreate
 */
export interface FindOrCreateResult<T> {
  created: boolean;
  doc: DocumentType<T>;
}

/**
 * This class contains all types for the module "mongoose-findorcreate", adjusted for typegoose
 */
@plugin(findorcreate)
export abstract class FindOrCreate {
  public static findOrCreate: <T extends FindOrCreate>(
    this: mongoose.Model<T>,
    condition: FilterQuery<T>,
    createWith?: any
  ) => Promise<FindOrCreateResult<T>>;
}

export class User extends FindOrCreate {
  @prop({ required: true })
  public name!: string;

  @prop({})
  public age?: number;
}

export const UserModel = getModelForClass(User);
