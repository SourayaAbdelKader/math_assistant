import Base from "./axios";

class SolutionAPI extends Base {

    async getUncheckedProblems () {
        return await this.get('solution/allUnchecked');
    } 

    async getCheckedProblems () {
        return await this.get('solution/allChecked');
    } 
}

export default new  SolutionAPI();