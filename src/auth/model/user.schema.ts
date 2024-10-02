import { Schema } from 'mongoose';
import { UserRole } from '../enum/user-role.enum';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    required: true,
  },
});
