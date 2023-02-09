import { MANAGERTYPE } from "./enums/managerType.enum";
import minimist from "minimist";
import { ProductSQLManager } from "./managers/product.sql.manager";
import { sqliteconfig } from "./config/sqliteconfig";
import { MessageSQLManager } from "./managers/message.sql.manager";
import { MessageMongoManager } from "./managers/message.mongo.manager";
import { ProductMongoManager } from "./managers/product.mongo.manager";
import { DbClient } from "./dbclient";


const options = {default: {p: 8080, m: "FORK", db: "MONGO"}, alias:{p:"puerto", m:"mode", db:"database"}};
const args = minimist(process.argv.slice(2), options);


export const createManager = (managerType :number) :DbClient|null => {
    if(managerType === MANAGERTYPE.PRODUCTS && args.db === "MONGO")
        return new ProductMongoManager();
    if(managerType === MANAGERTYPE.PRODUCTS && args.db === "SQLITE")
        return new ProductSQLManager(sqliteconfig);
    if(managerType === MANAGERTYPE.MESSAGES && args.db === "MONGO") 
        return new MessageMongoManager;
    if(managerType === MANAGERTYPE.MESSAGES && args.db === "SQLITE") 
        return new MessageSQLManager(sqliteconfig);
    if(managerType === MANAGERTYPE.USERS) //USERS WILL ALWAYS BE STORED IN MONGO
        return new MessageMongoManager;   //AT LEAST FOR NOW
    return null;
}
