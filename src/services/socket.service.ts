import { Socket, Server as SocketServer} from "socket.io";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { createManager } from "../persistence/managerFactory";

const productManager = createManager(MANAGERTYPE.PRODUCTS);
const messageManager = createManager(MANAGERTYPE.MESSAGES);

export const startConnectionEvents = (io :SocketServer) => {
    io.on("connection", async (socket :Socket) => {
        if(productManager === null) {
            throw new Error("Failed to create product manager");
        }
        if(messageManager === null) {
            throw new Error("Failed to create message manager");
        }
        let products = await productManager.getObjects();
        socket.emit("products", {products: products})
        let messages = await messageManager.getObjects();
        socket.emit("messages", {messages: messages})
    })
}
