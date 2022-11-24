import Base from "./axios";

class DashboardAPI extends Base {

    async countUsers () {
        return await this.get('/countUsers');
    }

    async countQuestions () {
        return await this.get('/countQuestions');
    }

    async countEditors () {
        return await this.get('/countEditors');
    }

    async countAdmins () {
        return await this.get('general/countAdmins');
    }

    async countProblemsPerTag (id) {
        return await this.get('/problem/count/tag/'+id);
    }

    async countQuestionsPerTag (id) {
        return await this.get('question/countPerTag/'+id);
    }

    async countCheckedProblems () {
        return await this.get('solution/countAllChecked');
    }

    async countUncheckedProblems () {
        return await this.get('solution/countAllUnchecked');
    }

    async countCheckedSolutionsPerProblems (id) {
        return await this.get('/solution/problems/countChecked/'+id);
    }

    async countUncheckedSolutionsPerproblem (id) {
        return await this.get('solution/problems/countUnchecked/'+id);
    }

}
export default new  DashboardAPI();