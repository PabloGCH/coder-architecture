import { ManagerType } from "./enums/managerType.enum";
import minimist from "minimist";


const options = {default: {p: 8080, m: "FORK", db: "MONGO"}, alias:{p:"puerto", m:"mode", db:"database"}};
const args = minimist(process.argv.slice(2), options);


export class ManagerFactory {
    public static createManager(managerType :number) {
        if(
            managerType === ManagerType.PRODUCTS &&
            args.db === "MONGO"
        ) {
            return "RETURN MONGO PRODUCT MANAGER"
        }
        if(
            managerType === ManagerType.PRODUCTS &&
            args.db === "SQLITE"
        ) {
            return "RETURN SQLITE PRODUCT MANAGER"
        }
        if(
            managerType === ManagerType.MESSAGES &&
            args.db === "MONGO"
        ) {
            return "RETURN MONGO PRODUCT MANAGER"
        }
        if(
            managerType === ManagerType.MESSAGES &&
            args.db === "SQLITE"
        ) {
            return "RETURN SQLITE PRODUCT MANAGER"
        }
    }
}
