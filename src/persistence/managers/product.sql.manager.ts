import { Knex } from "knex";
import { SQLClient } from "../clients/sql.client";
import { ProductSQLTable } from "../models/product.sql.table";

export class ProductSQLManager extends SQLClient {
    constructor(config :Knex.Config) {
        super('products', config, ProductSQLTable);
    }
}
