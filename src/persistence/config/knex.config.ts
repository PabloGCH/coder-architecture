import knex, { Knex } from "knex";
import { logger } from "../../services/logger.service";
import { MessageSQLTable } from "../models/message.sql.table";
import { ProductSQLTable } from "../models/product.sql.table";
import { sqloptions } from "./mysqlconfig";
import { sqliteconfig } from "./sqliteconfig";

export class SQLDatabaseConnection {
    private static _instance: SQLDatabaseConnection = new SQLDatabaseConnection();
    private static database: Knex;
    private constructor() {
        SQLDatabaseConnection._instance = this;
    }
    public static getInstance(): SQLDatabaseConnection {
        return SQLDatabaseConnection._instance;
    }
    public getDatabase(): Knex {
        return SQLDatabaseConnection.database;
    }
    private createTableIfNotExists(): void {
        let tables = [{
            name: "products",
            schema: ProductSQLTable
        }, {
            name: "messages",
            schema: MessageSQLTable
        }];
        tables.forEach((table) => {
            SQLDatabaseConnection.database.schema.hasTable(table.name).then((exists) => {
                if(!exists) {
                    SQLDatabaseConnection.database.schema.createTable(table.name, table.schema)
                    .then(() => {
                        logger.info(`Table ${table.name} created because it didn't exist`);
                    })
                }
            });
        });
    }
    public connect(databaseName :string): void {
        if(!SQLDatabaseConnection.database) {
            let config :null|Knex.Config = null;
            if(databaseName === "SQLITE")
                config = sqliteconfig;
            if(databaseName === "SQL")
                config = sqloptions;
            if(config) {
                SQLDatabaseConnection.database = knex(config);
                this.createTableIfNotExists();
                return;
            }
            throw new Error("Invalid database name in arguments");
        } else {
            throw new Error("Database already connected");
        }
    }
}
