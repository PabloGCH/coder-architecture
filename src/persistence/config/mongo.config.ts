import mongoose from "mongoose";

export function initMongoDb() {
    //CONNECTS TO MONGO
    mongoose.connect(process.env.MONGODB_URL||"").then(
        () => {
            console.log("connection successful")
        },
        err => {
            console.log(err)
        }
    )
}
