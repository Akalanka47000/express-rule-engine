import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const { Schema, SchemaTypes } = mongoose;

const ruleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    conditions: {
      type: SchemaTypes.Mixed,
      required: true,
    },
    event: {
      type: SchemaTypes.Mixed,
      required: true,
    },
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

ruleSchema.plugin(mongoosePaginateV2);

const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;
