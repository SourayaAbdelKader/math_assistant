import Base from "./axios";

class UserAPI extends Base {

    async getUserById (id) {
        return await this.get('/general/users/'+id);
    }

    async searchTags (data) {
        return await this.get('tag/search/'+data);
    }

    async deviceToken (data) {
        return await this.post('general/saveToken',data);
    }

    async sendNotification (body) {
        return await this.post('general/sendNotification',body);
    }
}
export default new  UserAPI();