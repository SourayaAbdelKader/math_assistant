import Base from "./axios";

class AnswerAPI extends Base {

    async getAnswersPerQuestion (id) {
        return await this.get('answer/question/'+id);
    }

    async addAnswer (body) {
        return await this.post('answer/add', body);
    } 
}
export default new  AnswerAPI();