import Base from "./axios";

class QuestionAPI extends Base {

    async getQuestions () {
        return await this.get('question/');
    }

    async saveQuestion (body) {
        return await this.post('question/save', body);
    } 

    async unsaveQuestion (body) {
        return await this.post('question/removeSavedQuestion', body);
    } 

    async getQuestionById (id) {
        return await this.get('question/id/'+id);
    }
}
export default new  QuestionAPI();