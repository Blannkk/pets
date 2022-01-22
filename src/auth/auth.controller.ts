import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/users/dto/register-user.dto";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./login.dto";
import { AuthService } from "./auth.service";
import { ApiBadRequestResponse, ApiBasicAuth, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "src/users/dto/login-user.dto";



@Controller('auth') 
@ApiTags('users')

export class AuthController{
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ){}


    @Post('register')
    @ApiCreatedResponse({ status: 201,type: RegisterUserDto})
    @ApiBody({type: RegisterUserDto})
    @ApiOperation({ summary: 'Register A New User' })

    async register(@Body() RegisterUserDto: RegisterUserDto) {
        const user = await this.userService.create(RegisterUserDto)
        const payload = {
            email: user.email,
        };
        const token = await this.authService.singPayload(payload);
        return { user, token };
    }


    @Post('login')
    @ApiOkResponse({description: 'OK', type: LoginUserDto})
    @ApiBody({type: LoginUserDto})
    @ApiBearerAuth('access-token')
    @ApiNotFoundResponse({description: 'Not Found.!'})
    @ApiBadRequestResponse({description: 'Bad Requist.'})
    @ApiInternalServerErrorResponse({description: 'Internal Server Error.'})
    @ApiOperation({ summary: 'Logging In' })
    async login(@Body() UserDTO: LoginDTO) {
        const user = await this.userService.login(UserDTO);
        const payload = { email: user.email};

        const token = await this.authService.singPayload(payload);
        return { user, token}
    }

}

function jwt(jwt: any) {
    throw new Error("Function not implemented.");
}
