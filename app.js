const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
function createTeam() {
  if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  } fs.writeFileSync(outputPath, render(team), "utf8")
}
//three arrays of questions for Manager, engineer, intern

const mgrQs = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your name"
    }
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
    validate: function(answer) {
      const pass = answer.match(/^[0-9]*$/);
      if(pass) {
        return true;
      } return "please enter your ID";
    }
  },
  {
    type: "input",
    message: "What is your e-mail address?",
    name: "email",
    validate: function(answer) {
      const pass = answer.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
      if(pass) {
        return true;
      } return "please enter your email";
    }
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your telephone"
    }
  },
];
const engineerQs = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your name"
    }
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
    validate: function(answer) {
      const pass = answer.match(/^[0-9]*$/);
      if(pass) {
        return true;
      } return "please enter your ID";
    }
  },
  {
    type: "input",
    message: "What is your e-mail address?",
    name: "email",
    validate: function(answer) {
      const pass = answer.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
      if(pass) {
        return true;
      } return "please enter your email";
    }
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "github",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your username"
    }
  },
];
const internQs = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your name"
    }
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
    validate: function(answer) {
      const pass = answer.match(/^[0-9]*$/);
      if(pass) {
        return true;
      } return "please enter your ID";
    }
  },
  {
    type: "input",
    message: "What is your e-mail address?",
    name: "email",
    validate: function(answer) {
      const pass = answer.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
      if(pass) {
        return true;
      } return "please enter your email";
    }
  },
  {
    type: "input",
    message: "What college did you attend?",
    name: "school",
    validate: function(answer) {
      if(answer !== "") {
        return true;
      } return "please enter your school"
    }
  },
];

// const manager = new Manager(answer.email, github)

// Write code to use inquirer to gather information about the development team members,

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee would you like to add?",
        name: "choice",
        choices: ["Manager", "Engineer", "Intern", "Done"],
      },
    ])
    .then(function (answer) {
      switch (answer.choice) {
        case "Manager":
          inquirer.prompt(mgrQs).then(function(answers) {
            console.log(answers);
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(manager);
            init();
          })
          break;
        case "Engineer":
          inquirer.prompt(engineerQs).then(function(answers) {
            console.log(answers);
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            init();
          })
          break;
        case "Intern":
          inquirer.prompt(internQs).then(function(answers) {
            console.log(answers);
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            init();
          })
          break;
        default:
        createTeam();
      }
    });
}

init();