import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User} from './interfaces/user.interface';
import * as bcrypt from 'bcrypt'
import { Payload } from 'src/types/payload';

@Injectable()
export class UsersService {

 constructor(@InjectModel('User') private userModel: Model<User>) {}

 async create(RegisterDTO: RegisterUserDto) {
  const { email } = RegisterDTO;
  const user = await this.userModel.findOne({ email });
  if (user) {
    throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
  }
  const createdUser = new this.userModel(RegisterDTO);
  await createdUser.save();
  return this.sanitizeUser(createdUser);
}



  async login(UserDTO: LoginDTO) {
  const { email, password } = UserDTO;
  const user = await this.userModel.findOne({email});
  if(!user) {
    throw new HttpException('User dose not exist', HttpStatus.BAD_REQUEST);
  }

  if (await bcrypt.compare(password, user.password)) {
    return this.sanitizeUser(user);
  }else{
    throw new HttpException('Invalid Credential', HttpStatus.BAD_REQUEST);
  }
  }


  async findByPayload(payload: Payload) {
    const { email } = payload; 
    return await this.userModel.findOne({email});

  }

  // return user object without password
  sanitizeUser(user: User) {
  const sanitized = user.toObject();
  delete sanitized['password'];
  return sanitized;
  }

}
