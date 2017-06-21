var inquirer = require("inquirer");
var fs = require("fs");
var questionBank = require("./questions.json");
var clozeBank = require("./clozeset.json");
var startTheCloze = require("./clozeflashcard.js");
var youGetAQuestionHere = require("./questions.js");
var front = questionBank[0].front;
var back = questionBank[0].back;
var full = clozeBank[0].full;
var cloze = clozeBank[0].cloze;


var quiz = new youGetAQuestionHere();
var clozeQuiz = new startTheCloze();

//Prompts user to choose a basic or cloze flashcard
inquirer.prompt([{

    type: "list",
    name: "quizType",
    message: "Which type of flashcards would you like to look at?",
    choices: ["Basic", "Cloze"]


}]).then(function(answers) {

    if (answers.quizType === "Basic") {

        quiz.questionTime(front, back);

    } else {

        clozeQuiz.clozeIt(full, cloze);

    }
})