// IMPORTS
import env from "dotenv";
env.config();
import express from "express";
import cluster from "cluster";
import minimist from "minimist";
import os from "os";
const NUMBEROFCORES = os.cpus().length;
const options = {default: {p: 8080, m: "FORK", d: "MONGO"}, alias:{p:"puerto", m:"mode", d:"database"}};
const args = minimist(process.argv.slice(2), options);

import { initMongoDb } from "./persistence/config/mongo.config";
import { SQLDatabaseConnection } from "./persistence/config/knex.config";

//DABASE CONNECTIONS
initMongoDb(); //MONGO WILL ALWAYS BE CONNECTED, BECAUSE IT IS USED FOR AUTHENTICATION
if(args.d === "SQLITE" || args.d === "SQL")
    SQLDatabaseConnection.getInstance().connect(args.d);

import { Socket, Server as SocketServer} from "socket.io";
import { RouterManager } from "./routing/router";
import { loadConfig } from "./config/config";
import { startConnectionEvents } from "./services/socket.service";




//SERVER INITIALIZATION
if(args.m.toUpperCase() == "CLUSTER" && cluster.isPrimary) {
    console.log("Server initialized on cluster mode");
    for(let i = 0; i < NUMBEROFCORES; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, error) => {
        //RE RUN SUB PROCESS ON FAILURE
        cluster.fork();
    })
} else {
    if(args.m.toUpperCase() == "FORK") {console.log("Server initialized on fork mode")}
    const app = express();
    loadConfig(app);

    const server = app.listen(args.p, ()=>{console.log(`server listening on port ${args.p}`)});
    const io = new SocketServer(server)
    startConnectionEvents(io);
    app.use("/", new RouterManager(io).getRouter());
}



