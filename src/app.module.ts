import'dotenv/config'
import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI,
    { useNewUrlParser: true }),
    CatsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}
