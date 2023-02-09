import { ManagerType } from "./enums/managerType.enum";
import minimist from "minimist";
import { productMongoManager } from "./managers/product.mongo.manager";
import { ProductSQLManager } from "./managers/product.sql.manager";
import { sqliteconfig } from "./config/sqliteconfig";
import { MessageSQLManager } from "./managers/message.sql.manager";
import { MessageMongoManager } from "./managers/message.mongo.manager";


const options = {default: {p: 8080, m: "FORK", db: "MONGO"}, alias:{p:"puerto", m:"mode", db:"database"}};
const args = minimist(process.argv.slice(2), options);


export class ManagerFactory {
    public static createManager(managerType :number) {
        if(managerType === ManagerType.PRODUCTS && args.db === "MONGO")
            return new productMongoManager();
        if(managerType === ManagerType.PRODUCTS && args.db === "SQLITE")
            return new ProductSQLManager(sqliteconfig);
        if(managerType === ManagerType.MESSAGES && args.db === "MONGO") 
            return new MessageMongoManager;
        if(managerType === ManagerType.MESSAGES && args.db === "SQLITE") 
            return new MessageSQLManager(sqliteconfig);
    }
}
