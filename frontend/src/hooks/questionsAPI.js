import Base from "./axios";

class QuestionAPI extends Base {

    async getQuestions () {
        return await this.get('question/');
    }

    async addQuestion (body) {
        return await this.post('question/add', body);
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

    async countQuestionPerUSer (id) {
        return await this.get('question/countPerUser/'+id);
    }

    async countSavedQuestionPerUSer (id) {
        return await this.get('question/countSavedQuestions/'+id);
    }

    async countTagsPerUSer (id) {
        return await this.get('question/userTags/'+id);
    }

    async savedQuestions (id) {
        return await this.get('question/savedQuestions/'+id);
    }

    async searchQuestion (word) {
        return await this.get('question/search/'+word);
    }

}
export default new  QuestionAPI();