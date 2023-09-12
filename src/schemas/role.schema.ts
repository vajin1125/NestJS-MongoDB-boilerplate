import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
