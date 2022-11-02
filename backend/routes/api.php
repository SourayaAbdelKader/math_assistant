<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\ScoreController;

Route::prefix('v0')->group(function () {

    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });

    // ___________________ Routes related to the users ___________________
    Route::prefix('general')->group(function () {

        // getting users info regarding their user type 
        Route::get('/getUsers', [UserController::class, 'getUsers'])->name('get-users');
        Route::get('/editors', [UserController::class, 'getEditors'])->name('get-editors');
        Route::get('/admins', [UserController::class, 'getAdmins'])->name('get-admins');
        
        // getting user info
        Route::get('/users/{id?}', [UserController::class, 'getUserInfo'])->name('get-user-info');
        Route::get('/users/email/{email?}', [UserController::class, 'getUserByEmail'])->name('get-user-by-email');
        
        // counting users info regarding their user type
        Route::get('/countUsers', [UserController::class, 'countUsers'])->name('count-users');
        Route::get('/countEditors', [UserController::class, 'countEditors'])->name('count-editors');
        Route::get('/countAdmins', [UserController::class, 'countAdmins'])->name('count-admin');

        // manipulating user's data
        Route::post('/addEditor', [UserController::class, 'addEditor'])->name('add-editor');
        Route::post('/addUser', [UserController::class, 'addUser'])->name('add-user');
        Route::post('/addAdmin', [UserController::class, 'addAdmin'])->name('add-admin');
        Route::post('/deleteUser/{id?}', [UserController::class, 'deleteUser'])->name('delete-user');
        Route::post('/userUpdate/{id?}', [UserController::class, 'updateUser'])->name('update-user');

        // getting users depending on a certain time
        Route::get('/yearUSers', [UserController::class, 'yearUSers'])->name('year-users');
        Route::get('/monthUsers', [UserController::class, 'monthUsers'])->name('month-users');
        Route::get('/todayUser', [UserController::class, 'todayUser'])->name('today-users');
        Route::get('/weekUser', [UserController::class, 'weekUser'])->name('week-users');
        Route::get('/lastMonthUsers', [UserController::class, 'lastMonthUsers'])->name('last-month-users');
        Route::get('/lastYearUsers', [UserController::class, 'lastYearUsers'])->name('last-year-users');

        // getting editors depending on a certain time
        Route::get('/yearEditors', [UserController::class, 'yearEditor'])->name('year-editors');
        Route::get('/monthEditors', [UserController::class, 'monthEditor'])->name('month-editors');
        Route::get('/todayEditors', [UserController::class, 'todayEditor'])->name('today-editors');
        Route::get('/weekEditors', [UserController::class, 'weekEditor'])->name('week-editors');
        Route::get('/lastMonthEditors', [UserController::class, 'lastMonthEditors'])->name('last-month-editors');
        Route::get('/lastYearEditors', [UserController::class, 'lastYearEditors'])->name('last-year-editors');

        // getting admins depending on a certain time
        Route::get('/yearAdmins', [UserController::class, 'yearAdmin'])->name('year-admins');
        Route::get('/monthAdmins', [UserController::class, 'monthAdmin'])->name('month-admins');
        Route::get('/todayAdmins', [UserController::class, 'todayAdmin'])->name('today-admins');
        Route::get('/weekAdmins', [UserController::class, 'weekAdmin'])->name('week-admins');
        Route::get('/lastMonthAdmins', [UserController::class, 'lastMonthAdmins'])->name('last-month-admins');
        Route::get('/lastYearAdmins', [UserController::class, 'lastYearAdmins'])->name('last-year-admins');
    });

    // ___________________ Routes related to scores ___________________
    Route::prefix('score')->group(function () {
        Route::get('/id/{id?}', [ScoreController::class, 'score'])->name('get-user-score');
        Route::get('/asnwers/{id?}', [ScoreController::class, 'answerScore'])->name('get-user-score-for-answers');

    });

    // ___________________ Routes related to the tags ___________________
    Route::prefix('tag')->group(function () {
        Route::get('/', [TagController::class, 'getTags'])->name('get-tags');
        Route::get('/id/{id?}', [TagController::class, 'getTagById'])->name('get-tag-by-id');
        Route::get('/search/{data?}', [TagController::class, 'searchTag'])->name('search-tag');
        Route::get('/name/{name?}', [TagController::class, 'getTagByName'])->name('get-tag-by-name');
        Route::get('/count', [TagController::class, 'countTags'])->name('count-tags');
        
        // manipulating tag's data
        Route::post('/add', [TagController::class, 'addTag'])->name('add-tag');
        Route::post('/update/{id?}', [TagController::class, 'updateTag'])->name('update-tag');
        Route::post('/delete/{id?}', [TagController::class, 'deleteTag'])->name('delete-tag');
    });

    // ___________________ Routes related to the tags ___________________
    Route::prefix('question')->group(function () {

        // getting informations
        Route::get('/', [QuestionController::class, 'getQuestions'])->name('get-questions');
        Route::get('/id/{id?}', [QuestionController::class, 'getQuestionById'])->name('get-question-by-id');
        Route::get('/tag/{id?}', [QuestionController::class, 'getQuestionsPerTag'])->name('get-question-per-tag');
        Route::get('/search/{data?}', [QuestionController::class, 'searchQuestion'])->name('search-question');
        Route::get('/user/{id?}', [QuestionController::class, 'getQuestionsPerUser'])->name('get-question-per-user');
        Route::get('/count', [QuestionController::class, 'countQuestions'])->name('count-questions');
        Route::get('/countPerTag/{id?}', [QuestionController::class, 'countQuestionsPerTag'])->name('count-questions-per-tag');
        Route::get('/countPerUser/{id?}', [QuestionController::class, 'countQuestionsPerUser'])->name('count-questions-per-user');
        Route::get('/userTags/{id?}', [QuestionController::class, 'getTagsUsedByUser'])->name('count-questions-per-user');

        
        // getting questions depending on a certain time
        Route::get('/yearQuestions', [QuestionController::class, 'yearQuestions'])->name('year-questions');
        Route::get('/monthQuestions', [QuestionController::class, 'monthQuestions'])->name('month-questions');
        Route::get('/todayQuestions', [QuestionController::class, 'todayQuestion'])->name('today-questions');
        Route::get('/weekQuestions', [QuestionController::class, 'weekQuestion'])->name('week-questions');
        Route::get('/lastMonthQuestions', [QuestionController::class, 'lastMonthQuestion'])->name('last-month-questions');
        Route::get('/lastYearQuestion', [QuestionController::class, 'lastYearQuestion'])->name('last-year-questions');

        // routes related to saved questions
        Route::post('/save', [QuestionController::class, 'saveQuestion'])->name('save-question');
        Route::get('/savedQuestions/{id?}', [QuestionController::class, 'getSavedQuestions'])->name('get-saved-question');
        Route::post('/removeSavedQuestion', [QuestionController::class, 'removeSavedQuestion'])->name('remove-saved-question');
        Route::get('/countSavedQuestions/{id?}', [QuestionController::class, 'countSavedQuestions'])->name('count-saved-question');

        // manipulating question's data
        Route::post('/add', [QuestionController::class, 'addQuestion'])->name('add-question');
        Route::post('/update/{id?}', [QuestionController::class, 'EditQuestion'])->name('update-question');
        Route::post('/delete/{id?}', [QuestionController::class, 'deleteQuestion'])->name('delete-question');
    });

    // ___________________ Routes related to the answers ___________________
    Route::prefix('answer')->group(function () {
        // manipulating answers's data
        Route::post('/add', [AnswerController::class, 'addAnswer'])->name('add-answer');
        Route::post('/delete/{id?}', [AnswerController::class, 'deleteAnswer'])->name('delete-answer');

        // routes for accepting and voting for answers
        Route::post('/accept', [AnswerController::class, 'acceptAnswer'])->name('accept-answer');
        Route::post('/voteUp', [AnswerController::class, 'voteUpAnswer'])->name('vote-up-answer');
        Route::post('/voteDown', [AnswerController::class, 'voteDownAnswer'])->name('vote-down-answer');
        
        Route::get('/question/{id?}', [AnswerController::class, 'getAnswersPerQuestion'])->name('get-answers-per-question');
        Route::get('/votes/{id?}', [AnswerController::class, 'countVotesPerQuestion'])->name('count-votes-per-answer');  
        Route::get('/id/{id?}', [AnswerController::class, 'getAnswerById'])->name('get-answer-by-id');  
        Route::get('/accepted/{id?}', [AnswerController::class, 'getAcceptedAnswersPerQuestion'])->name('get-accepted-answers-per-question');  
        Route::get('/countAccepted/{id?}', [AnswerController::class, 'countAcceptedAnswersPerQuestion'])->name('count-accepted-answers-per-question');  
        Route::get('/countUserVotes/{id?}', [AnswerController::class, 'countVotesPerUSer'])->name('count-user-votes');  
        Route::get('/countVotesPerDay/{id?}', [AnswerController::class, 'countVotesPerUSerPerDay'])->name('count-user-votes');  
        Route::get('/acceptedUser/{id?}', [AnswerController::class, 'getAcceptedAnswersPerUser'])->name('get-accepted-answers-per-user');  
        Route::get('/countAcceptedUser/{id?}', [AnswerController::class, 'countAcceptedAnswersPerUser'])->name('count-accepted-answers-per-user');  
    });

    // ___________________ Routes related to the problems ___________________
    Route::prefix('problem')->group(function () {
        // manipulating problems's data
        Route::post('/add', [ProblemController::class, 'addProblem'])->name('add-problem');
        Route::post('/delete/{id?}', [ProblemController::class, 'deleteProblem'])->name('delete-problem');
        Route::post('/update/{id?}', [ProblemController::class, 'EditProblem'])->name('edit-problem'); 

        // getting data
        Route::get('/', [ProblemController::class, 'getProblems'])->name('get-problems');
        Route::get('/id/{id?}', [ProblemController::class, 'getProblemById'])->name('get-problem-by-id');
        Route::get('/count', [ProblemController::class, 'countProblems'])->name('count-problems');
        Route::get('/count/tag/{id?}', [ProblemController::class, 'countProblemsPerTag'])->name('count-problems-per-tag');
        Route::get('/tag/{id?}', [ProblemController::class, 'getProblemsPerTag'])->name('get-problems-per-tag');
        Route::get('/count/level/{id?}', [ProblemController::class, 'countProblemsPerLevel'])->name('count-problems-per-level');
        Route::get('/level/{level?}', [ProblemController::class, 'getProblemsPerLevel'])->name('get-problems-per-level');
    });

    // ___________________ Routes related to the Solutions ___________________
    Route::prefix('solution')->group(function () {
        // getting all data
        Route::get('/all', [SolutionController::class, 'getAllSolutions'])->name('get-solutions');
        Route::get('/countAll', [SolutionController::class, 'countAllSolutions'])->name('count-solutions');
        Route::get('/allChecked', [SolutionController::class, 'getAllCheckedSolutions'])->name('get-checked-solutions');
        Route::get('/countAllChecked', [SolutionController::class, 'countAllCheckedSolutions'])->name('count-checked-solutions');
        Route::get('/allUnchecked', [SolutionController::class, 'getAllUncheckedSolutions'])->name('get-unchecked-solutions');
        Route::get('/countAllUnchecked', [SolutionController::class, 'countAllUncheckedSolutions'])->name('count-unchecked-solutions');
        Route::get('/getFullmarked', [SolutionController::class, 'getAllFullmarkedSolutions'])->name('get-fullmarked-solutions');
        Route::get('/countFullmarked', [SolutionController::class, 'countAllFullmarkedSolutions'])->name('count-fullmarked-solutions');
        
        // manipulating problems's data
        Route::post('/add', [SolutionController::class, 'addSolution'])->name('add-solution');
        Route::post('/check', [SolutionController::class, 'checkSolution'])->name('check-solution'); 

        // getting data per problem
        Route::post('/getProblemSolution', [SolutionController::class, 'getUserSolutionForProblem'])->name('get-user-solution-for-problem');
        Route::get('/id/{id?}', [SolutionController::class, 'getSolution'])->name('get-solutions-by-id');
        Route::get('/problem/{id?}', [SolutionController::class, 'getProblemSolution'])->name('get-solutions-per-problem');
        Route::get('/countProblem/{id?}', [SolutionController::class, 'countProblemSolution'])->name('count-solutions-per-problem');
        
        // getting data per problem depending on it's status : checked/unchecked/fullmarked
        Route::get('/problems/checked/{id?}', [SolutionController::class, 'getCheckedProblemSolution'])->name('get-checked-solutions-per-problem');
        Route::get('/problems/countChecked/{id?}', [SolutionController::class, 'countCheckedProblemSolution'])->name('count-checked-solutions-per-problem');

        Route::get('/problems/unchecked/{id?}', [SolutionController::class, 'getUncheckedProblemSolution'])->name('get-unchecked-solutions-per-problem');
        Route::get('/problems/countUnchecked/{id?}', [SolutionController::class, 'countUncheckedProblemSolution'])->name('count-unchecked-solutions-per-problem');

        Route::get('/problems/fullmarked/{id?}', [SolutionController::class, 'getFullmarkedProblemSolution'])->name('get-fullmarked-solutions-per-problem');
        Route::get('/problems/countFullmarked/{id?}', [SolutionController::class, 'countFullmarkedSolutions'])->name('count-fullmarked-solutions-per-problem');
        Route::get('/problems/order/{id?}', [SolutionController::class, 'getOrderedSolutions'])->name('get-ordered-solutions-per-problem');
        
        // getting data per user
        Route::get('/user/{id?}', [SolutionController::class, 'getUserSolutions'])->name('get-solutions-per-user');
        Route::get('/countUser/{id?}', [SolutionController::class, 'countUserSolutions'])->name('count-solutions-per-user');
        Route::get('/user/checked/{id?}', [SolutionController::class, 'getCheckedSolutions'])->name('get-checked-solutions-per-user');
        Route::get('/user/countChecked/{id?}', [SolutionController::class, 'countCheckedSolutions'])->name('count-checked-solutions-per-user');
        Route::get('/user/unchecked/{id?}', [SolutionController::class, 'getUncheckedSolutions'])->name('get-unchecked-solutions-per-user');
        Route::get('/user/countUnchecked/{id?}', [SolutionController::class, 'countUncheckedSolutions'])->name('count-unchecked-solutions-per-user');
        Route::get('/user/fullmarked/{id?}', [SolutionController::class, 'getFullmarkedSolutionUser'])->name('get-fullmarked-solutions-per-user');
        Route::get('/user/countFullmarked/{id?}', [SolutionController::class, 'countFullmarkedSolutionUser'])->name('count-fullmarked-solutions-per-user');

        Route::get('/user/problem/checked/{id?}', [SolutionController::class, 'getCheckedProblems'])->name('get-checked-problems-per-user');
        Route::get('/user/problem/countChecked/{id?}', [SolutionController::class, 'countCheckedProblem'])->name('count-checked-problems-per-user');
        Route::get('/user/problem/unchecked/{id?}', [SolutionController::class, 'getUncheckedProblems'])->name('get-unchecked-problems-per-user');
        Route::get('/user/problem/countUnchecked/{id?}', [SolutionController::class, 'countUncheckedProblems'])->name('count-unchecked-problems-per-user');

        // getting data per editor
        Route::get('/editor/{id?}', [SolutionController::class, 'getCheckedSolutionsByEditor'])->name('get-solutions-checked-by-editor');
        Route::get('/countEditor/{id?}', [SolutionController::class, 'countCheckedSolutionsByEditor'])->name('count-solutions-checked-by-editor');

    });

});