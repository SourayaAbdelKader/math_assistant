import Base from "./axios";

class SetUSer extends Base {

    async login (body) {
        return await this.post('login', body);
    } 

    async signup (body) {
        return await this.post('register', body);
    } 

}

export default new  SetUSer();