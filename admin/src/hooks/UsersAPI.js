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

    async addEditor (body) {
        return await this.post('general/addEditor', body);
    }

    async editProfile (id, body) {
        return await this.post('general/userUpdate/'+id, body);
    }

}
export default new  UserAPI();