import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";

export class ProductSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('products', config ,(table :Knex.TableBuilder) =>{
            table.increments("id");
            table.string("name", 20);
            table.integer("price").nullable();
            table.string("imgUrl", 1500);
        });
    }
}
