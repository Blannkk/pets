import 'dotenv/config'
import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}


    async singPayload( payload: Payload) {
        return sign( payload, process.env.SECRET_KEY, { expiresIn: '3d'});
    }




    async validateUser(payload: Payload) {
        const user = await this.usersService.findByPayload(payload);
    
        return this.usersService.findByPayload(payload);
    }
}
