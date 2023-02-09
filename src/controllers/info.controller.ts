import { Request, Response } from "express";
import os from "os";
import { UserModel } from "../persistence/models/user.mongo.model";
const NUMBEROFCORES = os.cpus().length;

export const getServerInfo = async (req: Request, res: Response) => {
    if(process.send) {
        process.send(process.pid);
    }
    const serverData = {
        os: process.platform,
        vnode: process.versions.node,
        rrs: process.memoryUsage.rss(),
        pid: process.pid,
        args: process.argv.slice(2).toString(),
        execPath: process.execPath,
        projectPath: process.env.PWD,
        cores: NUMBEROFCORES
    }
    res.send(serverData);
}
export const getUsers = async (req: Request, res: Response) => {
    let users = UserModel.find({});
    res.send(users);
}
