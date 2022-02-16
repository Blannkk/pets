import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt'
import { Payload } from '../auth/types/payload';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

 constructor(@InjectModel('User') private userModel: Model<User>) {}

 async create(RegisterDTO: RegisterUserDto): Promise<User> {
  const { email } = RegisterDTO;
  const user = await this.userModel.findOne({ email });
    if (user) {
     throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
      const createdUser = new this.userModel(RegisterDTO);
      await createdUser.save();
     return createdUser;
  }



  async login(UserDTO: LoginUserDto): Promise<User> {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({email});
    if(!user) {
    throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return user ;
    }else{
    throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
      }
  }


  async findByPayload(payload: Payload) {
    const { email } = payload; 
    return await this.userModel.findOne({email});

  }
  
  

}
