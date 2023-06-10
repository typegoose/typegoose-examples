import { getModelForClass, plugin, prop } from '@typegoose/typegoose';
import { AutoIncrementID, AutoIncrementSimple } from '@typegoose/auto-increment';

@plugin(AutoIncrementSimple, { field: 'updatedCount' })
@plugin(AutoIncrementID, { field: 'signupID' })
export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ default: 0 })
  public updatedCount?: number;

  @prop()
  public signupID?: number;
}

export const UserModel = getModelForClass(User);
