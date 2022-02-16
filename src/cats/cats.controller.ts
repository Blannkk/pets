import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, NotFoundException, UseInterceptors, UploadedFile, UseGuards, ForbiddenException, Req, Res, SetMetadata } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './models/cat.schema';
import RoleGuard from 'src/auth/guards/role.guard';
import Role from 'src/auth/enum/role.enum';


@Controller('cats')
@ApiTags('Cats')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class CatsController {
  constructor(
    private readonly catsService: CatsService) {}

  
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ status: 201,type: CreateCatDto})
  @ApiBody({type: CreateCatDto})
  @ApiOperation({ summary: 'Create cat.' })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Req() req: Request,
    @UploadedFile() file,
    @Res() res ,
    @Body() Body: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create({
      ...Body,
      image: file?.filename,
    });
    return res.status(HttpStatus.CREATED).json(createdCat);
  }

  
  @ApiOperation({ summary: 'Get All Cats.' })
  @Get()
  async findAll(): Promise<Cat[]>{

    const cats = await this.catsService.findAll();
    return cats;
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'OK',
    type: Cat,
  })
  @ApiNotFoundResponse({description: 'Not Found.!'})
  @ApiBadRequestResponse({description: 'Bad Request.'})
  @ApiInternalServerErrorResponse({description: 'Internal Server Error.'})
  @ApiOperation({
    summary: 'Get Cat by id',
    description: 'Get Cat by id',
    operationId: 'findCatById',
  })
  @Get(':id')
   async findOne(
    @Res() res,
    @Param('id') id: number) {

    const cat = await this.catsService.findOne(id);
    if(!cat) {
      throw new NotFoundException('the cat with given ID dose not exist!.');
    }
    return res.status(HttpStatus.OK).json(cat);
  }



  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({description: 'OK',type: UpdateCatDto })
  @ApiBody({type: UpdateCatDto})
  @ApiNotFoundResponse({description: 'Not Found.!'})
  @ApiBadRequestResponse({description: 'Bad Request.'})
  @ApiInternalServerErrorResponse({description: 'Internal Server Error.'})
  @ApiOperation({
    summary: 'Update Cat by id',
    description: 'Update Cat by id',
    operationId: 'UpdateCatById',
  })
  @Put(':id')
  async update(
    @Res() res , 
    @Param('id') id: number, 
    @Body() Body: UpdateCatDto) {
    
    const updatedCat = await this.catsService.update( id , Body);
    if(!updatedCat) {
      throw new NotFoundException('the cat with given ID dose not exist!.')
    }
    return res.status(HttpStatus.OK).json(updatedCat) ;
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'OK',
    type: Cat })
  @ApiNotFoundResponse({description: 'Not Found.!'})
  @ApiBadRequestResponse({description: 'Bad Request.'})
  @ApiInternalServerErrorResponse({description: 'Internal Server Error.'})
  @ApiOperation({
    summary: 'Delete Cat by id',
    description: 'Delete Cat by id',
    operationId: 'deleteCatById',
  }) 
  @Delete(':id')  
  async remove(
    @Res() res ,
    @Param('id') id: number) {

    const deletedCat = await this.catsService.remove(id); 
    if(!deletedCat) {
      throw new NotFoundException('the cat with given ID dose not exist!.');
    }
    return res.status(HttpStatus.OK).json(deletedCat);
  }

  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('image'))
  // uploadFile(@UploadedFile() file: Express.Multer.File){
  //   return file;
  // }
}  
