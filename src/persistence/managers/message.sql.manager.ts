import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";

export class MessageSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('messages', config ,(table :Knex.TableBuilder) =>  {
            table.increments("id");
            table.string("email", 40);
            table.string("date", 70);
            table.string("message", 500);
        });
    }
}
