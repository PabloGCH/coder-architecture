import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";
import { ProductSQLSchema } from "../schemas/product.sql.schema";

export class ProductSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('products', config, ProductSQLSchema);
    }
}
