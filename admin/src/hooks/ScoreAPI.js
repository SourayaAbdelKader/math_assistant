import Base from "./axios";

class ScoreAPI extends Base {

    async getUSerScore (id) {
        return await this.get('/score/id/'+id);
    }

    async getUserAnswersScore (id) {
        return await this.get('score/asnwers/'+id);
    }

    async getUsePracticeScore (id) {
        return await this.get('score/practice/'+id);
    }

    async getFullmarkedNumber (id) {
        return await this.get('solution/user/countFullmarked/'+id);
    }

    async getSavedQuestionsNumber (id) {
        return await this.get('question/countPerUser'+id);
    }

    async getQuestionsNumber (id) {
        return await this.get('question/countPerUser'+id);
    }
}
export default new  ScoreAPI();