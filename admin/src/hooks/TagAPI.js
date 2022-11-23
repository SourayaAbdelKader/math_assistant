import Base from "./axios";

class TagAPI extends Base {

    async getTags () {
        return await this.get('tag/');
    }

    async searchTags (data) {
        return await this.get('tag/search/'+data);
    }

    async deleteTag (data) {
        return await this.post('tag/delete/'+data);
    }

    async editTag (id, body) {
        return await this.post('tag/update/'+id, body);
    }

    async addTag (body) {
        return await this.post('tag/add', body);
    }
}
export default new  TagAPI();