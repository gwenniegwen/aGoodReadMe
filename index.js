const inquirer = require("inquirer")
const fs = require("fs");
const util = require("util");
const axios = require("axios");


const writeFileAsync = util.promisify(fs.writeFile)

function promptUser() {

    return inquirer.prompt([

        {
            type: "input",
            name: "username",
            message: "What is your GitHub Username? "
        },

        {
            type: "input",
            name: "title",
            message: "What is the title of your project? "
        },

        {
            type: "input",
            name: "description",
            message: "Write a short description of your project "
        },
        {
            type: "checkbox",
            name: "license",
            message: "What kind of license should your program have? ",
            choices: [
                "MIT",
                "Apache 2.0",
                "GPL 3.0",
                "BSD 3.0",
                "No License Needed"
            ]
        },

        {
            type: "input",
            name: "install",
            message: "What command should be run to install dependencies "
        },

        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?"
        },

        {
            type: "input",
            name: "walkthrough",
            message: "What does the user need to know about using the repo?"
        },
        {
            type: "input",
            name: "contribute",
            message: "What does the user need to know about contributing to the repo?"
        },


    ])

        .then(function (userResponses) {
            const queryUrl = `https://api.github.com/users/${userResponses.username}`;

            axios.get(queryUrl).then(function ({ data }) {

                console.log(data)

                const generateMarkDown = generateReadMe(userResponses)

                function generateReadMe(userResponses) {
                    return `
# ${userResponses.title}
                
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]
(https://github.com/${data.login}/${userResponses.title})

## Description
${userResponses.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install necessary dependencies, run the following command: 
${userResponses.install}

## Usage
${userResponses.walkthrough}

## License
This project is licensed under the ${userResponses.license} license.

## Tests
${userResponses.tests}

## Questions
![avatar](${data.avatar_url})
If you have any questions about the repo, open an issue or contact 
[${userResponses.username}](https://api.github.com/users/${userResponses.username}) 
directly at [${data.email}]`
                }

                writeFileAsync("readme.md", generateMarkDown)

            })


        })

        .then(function () {
            console.log("Successfully wrote a readme");
        })

        .catch(function (err) {
            console.log(err);
        });

}





promptUser()



// <img src=  "${data.avatar_url}"
// alt="avatar" style="border-radius: 16px" width="30" />