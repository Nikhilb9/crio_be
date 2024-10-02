import { Document, ObjectId, Types } from 'mongoose';
import { UserRole } from '../enum/user-role.enum';

export interface CreateUser {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateUserDTOI {
  email: string;
  password: string;
}

export interface User extends Document {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
}
