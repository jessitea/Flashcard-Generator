var questionBank = require("./questions.json");
var inquirer = require("inquirer");
var correctCount = 0;
var wrongCount = 0;
var i = 0;

// Creates a basic flashcard
var BasicCard = function(front, back) {
    // defines the front/back of the card (first defined from the flashcard file)
    this.front = front;
    this.back = back;

    // function inside constructor to create a new flashcard
    this.questionTime = function(front, back) {

        // loops through the number of questions from .json file
        if (i < questionBank.length) {

            //prompts user with question
            inquirer.prompt([{
                name: "question",
                message: front
            }]).then(answers => {

                //new variable assigned to value of user's answer
                var rightAnswer = answers.question.toLowerCase().trim();

                // user's answer compared to "back" statement from .json file to determine if it is correct
                if (rightAnswer == back.toLowerCase()) {

                    console.log("You're right! Great job!");
                    correctCount++;
                    i++;

                    // if user's answer doesn't match with "back" statement from .json file, user gets a message
                } else {

                    console.log("Sorry, wrong answer!  The right answer is: " + back);
                    wrongCount++;
                    i++;



                }

                // if the number of loops matches the length of the .json set of questions, the game stops and user's stats are printed
                if (i == questionBank.length) {

                    console.log("===========");
                    console.log("Correct: " + correctCount);
                    console.log("Wrong: " + wrongCount);
                }

                // if the number of loops is less than the length of the .json file's set of questions, the next set of questions 
                // is pulled from the .json file and passed into the 'this.questionTime' function.
                if (i < questionBank.length) {
                    front = questionBank[i].front;
                    back = questionBank[i].back;
                    this.questionTime(front, back);

                }

            });




        }

    }




};

module.exports = BasicCard;