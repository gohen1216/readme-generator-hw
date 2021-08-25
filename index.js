const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      name: 'title',   
      message: 'What is the name of the app?',
    },
    {
        name: 'desc',
        message: 'enter a description?',
      },
      {
        name: 'install',
        message: 'what is the install command for your app?',
      },
      {
        name: 'usage',
        message: 'how do you start the app?',
      },
    {
      name: 'contributing',
      message: 'Who are the contributers?',
    },
    {
      name: 'test',
      message: 'What is the command to run test?',
    },
    {
      name: 'license',
      message: 'What license have you chosen?',
    type: 'list',choices: ["MIT","APACHE 2.0"]
    },
    {
      name: 'github',
      message: 'Enter your GitHub Username',
    },
    {
      name: 'email',
      message: 'Enter your email address.',
    },
  ]);
};

const generatereadme = (answers) =>
  `# ${answers.title}

  ${answers.desc}
  
  ## Installation
  
  ${answers.install}
  
 
  ## Usage
  
  ${answers.usage}
  
  ## Contributing

  ${answers.contributing}
  
  ## Test
  
  ${answers.test}
  
  ## License
  [MIT](https://choosealicense.com/licenses/mit/)`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => {
      console.log (answers)
      return writeFileAsync('./sample/README.md', generatereadme(answers))
    })
    .then(() => console.log('Successfully wrote readme to sample folder'))
    .catch((err) => console.error(err));
};

init();
