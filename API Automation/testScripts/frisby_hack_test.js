'use strict'

console.log("---------frisby_hack_test.js---STARTED----");

//---------import all the modules------------------------
const frisby = require('frisby');
const joi = frisby.Joi;
let conf = require("../jasmine.conf.js");

//---------define api url---------------------

let URI = conf.baseURI;
let env = conf.appEnv;
let testType = conf.testType;
let dataProvider = conf.dataProvider;

console.log("API URL -> ", URI);
console.log ("Test will be run on ", env);
console.log ("This is a  ", testType);


//--------------Test data preparation----------

const testData =require('../TestData/' + env + '/userData.json');
console.log ("Test file is   ", testData);

//---------Test cases preparation------------- 

const testDescription =require('../Test Description/testCases.json');
console.log ("Test description file is   ", testDescription);

//-----------Test cases section--------------
describe("USER API Test Suite for Health Check", ()=>{

    it("should perform Health check on User API", ()=> {

        return frisby.get(URI)
        .expect('status',200)
        .expect('jsonTypes','*',{
            id:joi.number(),
            first_name : joi.string()
        })
        .expect('json','data',{
            id:2
           })
        .then(function(res){
            let postId = res.json['data'].id;
            console.log("--id = ",postId);
            console.log(" API Response-> ",res);
            console.log(" API Response Body JSON-> ",res.json['data'].id);
              
       });
       
    });

});

//------------Program ended--------------------
console.log("---------frisby_hack_test.js---FINISHED----");