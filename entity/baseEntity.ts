import {
  FilterQuery,
  InsertManyOptions,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export default class BaseEntity {
  constructor(protected model: any) {
    this.model = model;
  }

  
  async findOne(
    query: FilterQuery<any>,
    projection: ProjectionType<any>,
    options: QueryOptions
  ) {
    try {
      return await this.model.findOne(query, projection, options).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(
    query: FilterQuery<any>,
    projection: ProjectionType<any>,
    options: QueryOptions
  ) {
    try {
      return await this.model.findById(query, projection, options).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(
    query: FilterQuery<any>,
    projection: ProjectionType<any>,
    options: QueryOptions
  ) {
    try {
      return await this.model.find(query, projection, options).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async insertMany<Type>(data: Type, options: InsertManyOptions) {
    try {
      return await this.model.insertMany(data, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByIdAndUpdate(
    conditions: FilterQuery<any>,
    update: UpdateQuery<any>,
    options: QueryOptions
  ) {
    try {
      return await this.model
        .findByIdAndUpdate(conditions, update, options)
        .exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async updateOne(
    query: FilterQuery<any>,
    update: UpdateQuery<any>,
    options: QueryOptions
  ) {
    try {
      return await this.model.updateOne(query, update, options).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
