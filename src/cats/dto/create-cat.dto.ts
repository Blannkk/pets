import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateCatDto {

     @ApiProperty({type: String, description: 'name'})
     name: string;

     @ApiProperty({type: Number, description: 'age'})
     age: number;

     @ApiProperty({type: String, description: 'breed'})
     breed: string;
     
     @ApiProperty({type: String, description: 'furColor'})
     furColor: string;

     @ApiProperty({type: String, description: 'opt: image'})
     image?: string;
}
    