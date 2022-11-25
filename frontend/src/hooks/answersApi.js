import Base from "./axios";

class AnswerAPI extends Base {

    async getAnswersPerQuestion (id) {
        return await this.get('answer/question/'+id);
    }

    async addAnswer (body) {
        return await this.post('answer/add', body);
    } 

    async acceptAnswer (body) {
        return await this.post('answer/accept', body);
    } 

    async voteUpAnswer (body) {
        return await this.post('answer/voteUp', body);
    } 

    async voteDownAnswer (body) {
        return await this.post('answer/voteDown', body);
    } 

    async getUserVote (id) {
        return await this.get('answer/user/vote/'+id);
    } 
    
}
export default new  AnswerAPI();