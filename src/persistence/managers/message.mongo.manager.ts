import { MongoClient } from "../clients/mongo.client";
import { MessageSchema } from "../schemas/message.mongo.schema";

export class MessageMongoManager extends MongoClient {
  constructor() {
    super(MessageSchema);
  }
}
