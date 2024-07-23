import { Model } from 'mongoose'

export class MongoDbRepo<T> {
  private model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async get(params: Partial<T>) {
    const cursor = await this.model.findOne<T>(params)
    return cursor
  }
}
