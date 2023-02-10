import { Socket, Server as SocketServer} from "socket.io";
import { MANAGERTYPE } from "../persistence/enums/managerType.enum";
import { createManager } from "../persistence/managerFactory";

const productManager = createManager(MANAGERTYPE.PRODUCTS);
const messageManager = createManager(MANAGERTYPE.MESSAGES);

export class SocketService {
    private static _instance :SocketService = new SocketService();
    private static io :SocketServer|null = null;
    public connect(server :any) {
        if(!SocketService.io) {
            SocketService.io = new SocketServer(server);
            this.startConnectionEvents();
            return;
        }
        throw new Error("Socket server already initialized");
    }
    private startConnectionEvents() {
        if(SocketService.io === null) { throw new Error("Socket server not initialized")}
        SocketService.io.on("connection", async (socket :Socket) => {
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
    public getSocketServer() :SocketServer {
        if(SocketService.io === null) { throw new Error("Socket server not initialized") }
        return SocketService.io 
    }
    public static getInstance() :SocketService { return SocketService._instance }
    private constructor() {}
}
