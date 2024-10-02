import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUser, User } from './interface/internal.interface';

@Injectable()
export class AuthRepositoryService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createManyUser(data: CreateUser[]): Promise<User[]> {
    return await this.userModel.insertMany(data);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find<User>();
  }
}
