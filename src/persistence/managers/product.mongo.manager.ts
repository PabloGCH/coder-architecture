import { MongoClient } from "../clients/mongo.client";
import { ProductSchema } from "../schemas/product.mongo.schema";

export class productMongoManager extends MongoClient {
  constructor() {
    super(ProductSchema);
  }
}
