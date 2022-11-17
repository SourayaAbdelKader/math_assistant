import Base from "./axios";

class UserAPI extends Base {

    async getUserById (id) {
        return await this.get('/general/users/'+id);
    }

    async searchTags (data) {
        return await this.get('tag/search/'+data);
    }
}
export default new  UserAPI();