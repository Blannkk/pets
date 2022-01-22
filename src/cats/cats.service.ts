import { Injectable } from '@nestjs/common';
import {  InjectModel } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat, CatDocument } from './models/cat.schema';

@Injectable()
export class CatsService {

  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>){}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.catModel.find().exec();
    return cats ;
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec()
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel
    .findByIdAndUpdate(id, updateCatDto, {new: true});
    return updatedCat;
  }

  async remove(id: number): Promise<any> {
    const deletedCat= await this.catModel
    .findByIdAndRemove(id);
    return deletedCat;
  }
}
