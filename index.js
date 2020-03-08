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
            message:"What command should be run to run tests?"
        },

        {
            type: "input",
            name: "walkthrough",
            message:"What does the user need to know about using the repo?"
        },
        {
            type:"input",
            name:"contribute",
            message:"What does the user need to know about contributing to the repo?"
        },


    ])

        .then(function (userResponses) {
            const queryUrl = `https://api.github.com/users/${userResponses.username}`;

           axios.get(queryUrl).then(function(response) {
               console.log(response.data)
           })

           
        

        const generateMarkDown = generateReadMe(userResponses);
        
     
        writeFileAsync("readme.md", generateMarkDown)
    })
    
    .catch(function(err) {
        console.log(err);
      });
        
    }
        
    function generateReadMe (userResponses){
        return `#${userResponses.title}
            ##${userResponses.description}
            ##Table of Contents
            *[installation]
            *[usage]
            *[license]
            *[contributions]
            *[tests]
            *[questions]
            ##Installation
            ${userResponses.install}
            ##Usage
            ${userResponses.walkthrough}
            ##License
            ${userResponses.license}
            ##Tests
            ${userResponses.tests}
            ##Questions`
    }
                
    //     var thestring = bigbadcode(userResponses)
            
    
promptUser()



