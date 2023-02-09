import express from "express";
import { Server } from "socket.io";
import { newProduct, test } from "../controllers/products.controller";

export class ProductsRouter {
    private router = express.Router();
    constructor(
        private io :Server
    ) {
        this.router.post("/product", newProduct(this.io));
    }
    getRouter() {
        return this.router;
    }
}

