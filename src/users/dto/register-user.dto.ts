import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({type: String, description: 'username', uniqueItems:true})
    @IsString()
    userName: string;

    @ApiProperty({type: String, description: 'email', uniqueItems: true})
    @IsEmail()
    email: string;

    @ApiProperty({type: String, description: 'password'})
    @IsString()
    password: string;
    
}
