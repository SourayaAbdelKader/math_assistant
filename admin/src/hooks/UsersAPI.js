import Base from "./axios";

class UserAPI extends Base {

    async getUser () {
        return await this.get('/general/getUsers');
    }

    async getUserById (id) {
        return await this.get('/general/users/'+id);
    }

    async getEditors () {
        return await this.get('/general/editors');
    }

    async getUSerScore (id) {
        return await this.get('/score/id/'+id);
    }

}
export default new  UserAPI();