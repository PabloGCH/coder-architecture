import { dbClient } from "../dbclient";
import knex, { Knex } from "knex";
import { sqliteconfig } from "../config/sqliteconfig";
import { knexTableBuilderCallback } from "../../interfaces/knexTableBuilderCallback";



export class sqliteClient implements dbClient {
    private tableName :string;
    private database:Knex;
    constructor(tableName: string, table :knexTableBuilderCallback) {
        this.tableName = tableName;
        this.database = knex(sqliteconfig);
        this.database.schema.createTableIfNotExists(this.tableName, table);
    }
    public async save(object: any): Promise<any> {
        let newObject = await this.database(this.tableName).insert(object);
        console.log(newObject);
        return {};
    }
    public async update(id: string | number, object: any): Promise<any> {
        let newObject = await this.database(this.tableName).first({id: id}).update(object);
        console.log(newObject);
        return {};
    }
    public async delete(id: number): Promise<void> {
        await this.database(this.tableName).where({id: id}).del();
    }
    public async getObjects(): Promise<any[]> {
        let objects = await this.database(this.tableName).select();
        console.log(objects);
        return [];
    }
    public async getObject(id: string | number): Promise<any> {
        let object = await this.database(this.tableName).first({id: id});
        console.log(object);
        return {};
    }
}
