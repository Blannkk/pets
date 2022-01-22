import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
   

    @ApiProperty({type: String, description: 'email'})
    @IsEmail()
    email: string;

    @ApiProperty({type: String, description: 'password'})
    @IsString()
    password: string;
    
}
