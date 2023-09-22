
'use strict'

console.log("---------jasmine.conf.js---STARTED----");

//---------import modules-------------

const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const dataProvider =  require('jasmine-data-provider');

//const reporters = require('jasmine-reporters');
//const junitReporter = new reporters.JUnitXmlReporter({
 //   savePath: __dirname,
   // consolidateAll: false
//});


//------------------Add an HTML Test Result----------------

//const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

const AllureReporter = require('jasmine-allure-reporter');



  
//-----Accepting Args from Command line------------------
const originalArgv =process.argv;
    console.log("Process argvo",process.argv0);
    let baseURI , appEnv ,testType;
    
    originalArgv.forEach((value,index)=>{
    
        console.log(`${index} : ${value}`);
    
        switch(value){
    
            case '--apiURL' :
                baseURI =process.argv[index+1];
                console.log ("base URI is ",baseURI);
                break;
            case '--env':
                appEnv = process.argv[index+1];
                console.log ("Test will be run on ",appEnv);
                break;
            case '--testtype' :
                testType = process.argv[index+1];
                console.log ("This is a  ",testType);
                break;    
        }
    
    
    });

//-------load spec files-----------

jasmine.loadConfigFile('spec/support/jasmine.json');

//jasmine.addReporter(junitReporter);
//-----------Attaching the Report--------
//jasmine.addReporter(new HtmlReporter({
 //   path: path.join(__dirname,'results')
 // }));

 //jasmine.getEnv().addReporter( new AllureReporter({resultsDir: 'allure-results'}));
 jasmine.addReporter(new AllureReporter({resultsDir: 'allure-results'}));

 
module.exports = {baseURI , appEnv ,testType ,dataProvider};
jasmine.execute();

//-------------------------------functions

console.log("---------jasmine.conf.js---FINISHED----");
