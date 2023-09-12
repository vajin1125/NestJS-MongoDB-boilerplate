import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  @Prop({ required: true })
  created_by: string;

  @Prop()
  updated_by: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop()
  updated_at: Date;
}
