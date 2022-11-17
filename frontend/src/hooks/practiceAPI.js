import Base from "./axios";

class PracticeAPI extends Base {

    async getPractices () {
        return await this.get('problem/');
    }

    async getCheckedProblems (id) {
        return await this.get('solution/user/problem/checked/'+id);
    }

    async getUncheckedProblems (id) {
        return await this.get('solution/user/problem/unchecked/'+id);
    } 
}
export default new  PracticeAPI();