import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateCatDto {

     @ApiProperty({type: String, description: 'name'})
     @IsString()
     name: string;

     @ApiProperty({type: Number, description: 'age'})
     @IsNumber()
     age: number;

     @ApiProperty({type: String, description: 'breed'})
     @IsString()
     breed: string;
     
     @ApiProperty({type: String, description: 'furColor'})
     @IsString()
     furColor: string;
}
    