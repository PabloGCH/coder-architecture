import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";
import { MessageSQLSchema } from "../schemas/message.sql.schema";

export class MessageSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('messages', config, MessageSQLSchema);
    }
}
