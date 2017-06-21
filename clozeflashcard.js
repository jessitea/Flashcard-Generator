var inquirer = require("inquirer");
var clozeBank = require("./clozeset.json");
var correctCount = 0;
var wrongCount = 0;
var i = 0;
var clozeSpaceArr = [];

// Constructor that reates a basic flashcard
var ClozeCard = function(full, cloze) {

    // defines the front/back of the card (first defined from the flashcard file)
    this.full = full;
    this.cloze = cloze;

    // function that creates blank dashes for the cloze word
    this.clozeDashes = function(cloze) {

        var test = cloze.split("");
        var numBlanks = test.length;

        for (var i = 0; i < numBlanks; i++) {

            if (test[i] == " ") {

                clozeSpaceArr.push(" ");
            } else {

                clozeSpaceArr.push("-");

            }


        }

    }

    // function that calls 'clozeDashes' function, then creates array of dashes for missing word(s)
    this.clozeIt = function(full, cloze) {

        this.clozeDashes(cloze);

        //re-defines 'full' text so that the 'cloze' word(s) get replaced with the dashes from the 'clozeSpaceArr' array
        full = full.replace(cloze, clozeSpaceArr.join(""));

        //calls function to create new flashcard
        this.questionTime(full, cloze);

    }

    // function inside constructor to create a new flashcard
    this.questionTime = function(full, cloze) {

        // loops through the number of questions from .json file
        if (i < clozeBank.length) {

            //prompts user with question
            inquirer.prompt([{
                name: "question",
                message: full
            }]).then(answers => {

                //new variable assigned to value of user's answer
                var rightAnswer = answers.question.toLowerCase().trim();

                // user's answer compared to cloze statement from .json file to determine if it is correct
                if (rightAnswer == cloze.toLowerCase()) {

                    console.log("You're right! Great job!");
                    correctCount++;
                    i++;

                    // if user's answer doesn't match with cloze statement from .json file, user gets a message
                } else {

                    console.log("Sorry!  The correct answer is: " + cloze);
                    wrongCount++;
                    i++;

                }

                // if the number of loops matches the length of the .json set of questions, the game stops and user's stats are printed
                if (i == clozeBank.length) {

                    console.log("===========");
                    console.log("Correct: " + correctCount);
                    console.log("Wrong: " + wrongCount);
                }

                // if the number of loops is less than the length of the .json file's set of questions, the next set of questions 
                // is pulled from the .json file and passed into the 'this.clozeIt' function. The 'clozeSpacesArr' array is emptied for a new question.
                if (i < clozeBank.length) {

                    full = clozeBank[i].full;
                    cloze = clozeBank[i].cloze;
                    clozeSpaceArr = [];
                    this.clozeIt(full, cloze);


                }

            });




        }

    }




};

module.exports = ClozeCard;