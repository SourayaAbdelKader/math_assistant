import Base from "./axios";

class AnswerAPI extends Base {

    async getAnswers () {
        return await this.get('Answer/');
    }

    async saveAnswer (body) {
        return await this.post('Answer/save', body);
    } 

    async addAnswer (body) {
        return await this.post('answer/add', body);
    } 
}
export default new  AnswerAPI();