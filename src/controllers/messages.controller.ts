import { Request, Response } from 'express';
import { errorLogger } from "../services/logger.service";
import { Server } from 'socket.io';
import { createManager } from '../persistence/managerFactory';
import { MANAGERTYPE } from '../persistence/enums/managerType.enum';

const messageManager = createManager(MANAGERTYPE.MESSAGES);

export const newMessage = async (io: Server) => {
    return (req: Request|any, res: Response|any) => {
        try {
            if(messageManager === null) {
                throw new Error("Failed to create message manager");
            }
            if(req.session.user == undefined){
                errorLogger.error({
                    message: "User not logged in",
                    url: req.url,
                    method: req.method
                })
                res.send({success: false, message: "not_logged"})
            } else {
                messageManager.save(req.body).then(() => {
                    messageManager.getObjects().then(messages => {
                        io.sockets.emit("messages", {messages: messages})
                        res.send({success: true})
                    })
                }).catch((err) => {
                    errorLogger.error({
                        message: "Failed to add message",
                        error: err,
                        url: req.url,
                        method: req.method
                    });
                    res.send({success: false, message: err || "Failed to add message"})
                })
            }
        }
        catch(err) {
            errorLogger.error({
                message: "Failed to add message",
                error: err || null,
                url: req.url,
                method: req.method
            })
            res.send({success: false, message: err || "Failed to add message"})
        }   
    }
}
