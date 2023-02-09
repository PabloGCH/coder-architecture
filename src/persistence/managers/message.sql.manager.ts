import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";
import { MessageSQLTable } from "../models/message.sql.table";

export class MessageSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('messages', config, MessageSQLTable);
    }
}
