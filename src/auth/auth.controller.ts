import {  BadRequestException, Body, Controller, Post , UseFilters, ValidationPipe } from "@nestjs/common";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { createdResponse } from "src/users/dto/created-response.dto";
import { loginResponse } from "src/users/dto/login-response.dto";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";

@Controller('auth')
@UseFilters(new HttpExceptionFilter)
@ApiTags('users')

export class AuthController{
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ){}


    @Post('register')
    @ApiCreatedResponse({ status: 201,type: createdResponse})
    @ApiBody({type: RegisterUserDto})
    @ApiOperation({ summary: 'Register A New User' })
    
    async register( @Body() Body: RegisterUserDto){
       const user = await this.userService.create(Body);
       if (user) {
        throw new BadRequestException();
       }
        const payload = { email: user.email, Role: user.Role};
        const token = await this.authService.singPayload(payload);
        return { user, token };
    }


    @Post('login')
    @ApiOkResponse({description: 'OK', type: loginResponse})
    @ApiBody({type: LoginUserDto})
    @ApiBearerAuth('access-token')
    @ApiBadRequestResponse({description: 'Bad Request.'})
    @ApiInternalServerErrorResponse({description: 'Internal Server Error.'})
    @ApiOperation({ summary: 'Logging In' })
    async login(@Body(new ValidationPipe()) UserDTO: LoginUserDto) {
        const user = await this.userService.login(UserDTO);
        if(!user) {
            throw new BadRequestException('Incorrect email or password');
            }
        const payload = { email: user.email, Role: user.Role};

        const token = await this.authService.singPayload(payload);
        return { user, token}
    }

}