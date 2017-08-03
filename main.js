var basicCard = require('./basicCard');
var clozeCard = require('./clozeCard');
var inquirer = require('inquirer');

inquirer.prompt([
	{
		name : 'selectGame',
		type : 'list',
		message: 'Choose a flashcard type',
		choices: ['Basic Card', 'Cloze Card']

	},
])

.then(answer => {
  if (answer.selectGame === "Basic Card") {
    // if user chooses basic card, get front and back values
    inquirer.prompt([
      {
        name: "front",
        type: "input",
        message: "Front: Please type the question that will appear on the front."
      }, {
        name: "back",
        type: "input",
        message: "Back: Please type the answer that will appear on the back."
      }
    ])
    .then(answers => {
      // using the answers, construct a new basic card and log it
      var newBasic = new basicCard(answers.front, answers.back);
      console.log(`  BASIC:\n  Front: ${newBasic.front}\n  Back: ${newBasic.back}`);
    });
  } else {
    // if user chooses cloze-deleted card, get values for full text and cloze
    inquirer.prompt([
      {
        name: "full",
        type: "input",
        message: "Please write the complete sentence:"
      }, {
        name: "cloze",
        type: "input",
        message: "Please write the part that will be omitted for the answer."
      }
    ])
    .then(answers => {
      var newCloze = new clozeCard(answers.full, answers.cloze);
      console.log(`  CLOZE-DEL:\n  Partial: ${newCloze.partial}\n  Full: ${newCloze.fullText}`);
    });
  }
});