import Base from "./axios";

class HomeAPI extends Base {

    async getUsersNumber () {
        return await this.get('countUsers');
    } 

    async getEditorsNumber() {
        return await this.get('countEditors');
    } 

    async getProblemsNumber() {
        return await this.get('countProblems');
    } 

    async getQuestionsNumber() {
        return await this.get('countQuestions');
    } 
    
}

export default new  HomeAPI();