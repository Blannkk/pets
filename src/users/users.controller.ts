// import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { UsersService } from './users.service';
// import { AuthService } from '../auth/auth.service';
// import { LoginDTO } from 'src/auth/login.dto';


// @Controller('auth')
// export class UsersController {
//     constructor(
//         private userService: UsersService,
//         private authService: AuthService,
        
//       ) {}

//     @Post('register')
//     async register(@Body() RegisterDTO: RegisterUserDto) {
//       const user = await this.userService.create(RegisterDTO);
//       const payload = {
      
//         email: user.email,
//       };
  
//       const token = await this.authService.singPayload(payload);
//       return { user, token };
//     }
//     @Post('login')
//     async login(@Body() UserDTO: LoginDTO) {
//       const user = await this.userService.findByLogin(UserDTO);
//       const payload = {
//         email: user.email,
//       };
//       const token = await this.authService.singPayload(payload);
//       return { user, token};
//     }

// }
