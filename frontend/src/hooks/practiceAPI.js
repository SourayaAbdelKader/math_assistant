import Base from "./axios";

class PracticeAPI extends Base {

    async getPractices () {
        return await this.get('problem/');
    }

    async getSolutions () {
        return await this.get('solution/all');
    }

    async getPracticeById (id) {
        return await this.get('problem/id/'+id);
    }

    async getCheckedProblems (id) {
        return await this.get('solution/user/problem/checked/'+id);
    }

    async getUncheckedProblems (id) {
        return await this.get('solution/user/problem/unchecked/'+id);
    } 

    async countPracticePerUSer (id) {
        return await this.get('solution/countUser/'+id);
    } 

    async addSolution (body) {
        return await this.post('solution/add', body)
    }
}
export default new  PracticeAPI();