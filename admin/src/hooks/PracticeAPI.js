import Base from "./axios";

class PracticeAPI extends Base {

    async getPractices () {
        return await this.get('problem/');
    }

    async getPracticeById (id) {
        return await this.get('/problem/id/'+id);
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

    async addPractice (body) {
        return await this.post('problem/add', body)
    }  

    async addFeedback (body) {
        return await this.post('solution/check', body)
    } 

    async sendNotification (body) {
        return await this.post('general/add/notification', body)
    }
    
}

export default new  PracticeAPI();