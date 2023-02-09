export class UserDTO {
    public username: string = "";
    constructor(object:any) {
        this.username = object.username;
    }
}
