export class MessageDTO {
    id: string|number;
    email: string;
    date: string;
    message: string;
    constructor(object :any) {
        this.id = object.id || object._id || "";
        this.email = object.email || "";
        this.date = object.date || "";
        this.message = object.message || "";
    }
}
