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
    type: 'list',choices: ["MIT","APACHE 2.0","GNU General Public License v3.0","BSD 2-Clause Simplified License","BSD 3-Clause New or Revised License","Boost Software License 1.0","Eclipse Public License 2.0","GNU Affero General Public License v3.0","GNU General Public License v2.0", "GNU Lesser General Public License v2.1","Mozilla Public License 2.0","The Unlicense"]
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
  
  ## Table of contents
  [Installation](#installation)
 
  [Usage](#usage)

  [Contributing](#contributing)

  [Test](#test)

  [License](#license)

  [Questions](#questions)

  ## Installation
  
  ${answers.install}
  
 
  ## Usage
  
  ${answers.usage}
  
  ## Contributing

  ${answers.contributing}
  
  ## Test
  
  ${answers.test}

  ## License
  ${answers.license}

  ## Questions
  [${answers.github}](https://github.com/${answers.github})
  you can contact me at [${answers.email}](mailto:${answers.email})

  
  `;

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
