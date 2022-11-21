import Base from "./axios";

class TagAPI extends Base {

    async getTags () {
        return await this.get('tag/');
    }

    async searchTags (data) {
        return await this.get('tag/search/'+data);
    }
}
export default new  TagAPI();