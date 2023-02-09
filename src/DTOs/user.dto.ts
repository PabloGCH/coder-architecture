export class UserDTO {
    private username: string = "";
    constructor(user :any) {
        this.username = user.username;
    }
}
