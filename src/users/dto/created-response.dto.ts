import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class createdResponse {
    @ApiProperty({type: String, description: 'username', uniqueItems:true})
    name: string;

    @ApiProperty({type: String, description: 'email', uniqueItems: true})
    email: string;

    @ApiProperty({type: String, description: '_id'})
    _id: string;

    @ApiProperty({type: String, description: 'token'})
    token: string;
    
}
