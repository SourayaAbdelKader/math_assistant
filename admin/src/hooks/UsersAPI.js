import Base from "./axios";

class UserAPI extends Base {

    async getUser () {
        return await this.get('/general/getUsers');
    }

    async getUSerScore (id) {
        return await this.get('/score/id/'+id);
    }
}
export default new  UserAPI();