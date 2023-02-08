import { Model } from "mongoose";
import { dbClient } from "../dbclient";


export class MongoClient implements dbClient{
    private schema :Model<any>;
    constructor(schema :Model<any>) {
        this.schema = schema;
    }
    public async save(object :any) :Promise<any> {
        let newObject :any = await this.schema.create(object);
        return newObject;
    }
    public async delete(id: number) :Promise<void> {
        await this.schema.findByIdAndDelete(id);
    }
    public async getObjects() :Promise<any[]> {
        let objects = await this.schema.find({});
        console.log(objects);
        //parse to DTO
        return []
    }
    public async getObject(id: string | number) :Promise<any> {
        let object = await this.schema.findById(id);
        console.log(object);
        //parse to DTO
        return {};
    }
    public async update(id: string | number, object: any) :Promise<any> {
        let updatedObject = await this.schema.findByIdAndUpdate(id, object);
        console.log(updatedObject);
        //parse to DTO
        return {};
    }
}
