export class ProductDTO {
    id: number|string;
    name: string;
    price: number;
    imgUrl: string;
    constructor(object :any) {
        this.id = object.id || object._id || "";
        this.name = object.name || "";
        this.price = object.price || 0;
        this.imgUrl = object.imgUrl || "";
    }
}
