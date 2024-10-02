import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  recipients: [Schema.Types.ObjectId],
});
