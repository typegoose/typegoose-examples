/* eslint-disable @typescript-eslint/no-empty-interface */
import { DocumentType, getModelForClass, plugin, prop } from '@typegoose/typegoose';
import * as mongooseDelete from 'mongoose-delete';

export interface User extends mongooseDelete.SoftDeleteInterface {}

@plugin(mongooseDelete, { deletedAt: true })
export class User {
  @prop({ required: true })
  public name!: string;
}

// casting "as any" is required, because otherwise the types are not compatible and some manual addition of properties would be needed
export const UserModel = getModelForClass(User) as any as mongooseDelete.SoftDeleteModel<
  DocumentType<User> & mongooseDelete.SoftDeleteDocument
>;
