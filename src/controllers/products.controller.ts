import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { ControllerBuilder } from '../interfaces/controller.interface';
import { MANAGERTYPE } from '../persistence/enums/managerType.enum';
import { createManager } from '../persistence/managerFactory';
import { errorLogger } from '../services/logger.service';

const productManager = createManager(MANAGERTYPE.PRODUCTS); 

export const newProduct :ControllerBuilder  = (io :Server) => {
    return async(req :Request|any, res :Response|any) => {
        try {
            if(productManager === null) {
                throw new Error("Failed to create product manager");
            }
            if(req.session.user == undefined){
                let error = {success: false, message: "not_logged"};
                errorLogger.error({
                    message: "User not logged in",
                    url: req.url,
                    method: req.method
                })
                res.send(error)
            } else {
                let product = req.body;
                Object.assign(product, {price: parseInt(product.price)});
                productManager.save(product).then(() => {
                    productManager.getObjects().then((products:any) => {
                        io.sockets.emit("products", {products: products})
                        res.send({success: true})
                    })
                })
                .catch(err => {
                    errorLogger.error({
                        message: "Failed to add product",
                        error: err,
                        url: req.url,
                        method: req.method
                    });
                    res.send({success: false, message: err || "Failed to add product"})
                })
            }
        }
        catch(err) {
            errorLogger.error({
                message: "Failed to add product",
                error: err,
                url: req.url,
                method: req.method
            });
            res.send({success: false, message: err || "Failed to add product"})
        }
    }
}
