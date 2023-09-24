'use strict'

console.log("---------toq_test.js---STARTED----");

//--------------import all modules----------

const frisby = require('frisby');
const Joi = frisby.Joi;
let conf = require("../jasmine.conf.js");
const schema = require ("./jsonSchema.js");
//const Joi = require('joi');


//--------define all elements-----------

let URI = conf.baseURI;
let env = conf.appEnv;
let testType = conf.testType;
let dataProvider = conf.dataProvider;

console.log("API URL -> ",URI);
console.log ("Test will be run on ",env);
console.log ("This is a  ",testType);


//--------------Test data preparation----------

const testData =require('../TestData/' + env + '/userData.json');
console.log ("Test file is   ", testData);

//---------Test cases preparation------------- 

const testDescription =require('../Test Description/testCases.json');
console.log ("Test description file is   ", testDescription);

//--------------Test cases section-----------

describe("Sample API Test-1", ()=>{

    let num = 10;
    console.log("number = ",num);
  
    it("should be true", async ()=>{

        await expect(num).toBe(10);

    });

    it("should be false", ()=>{

        expect(num).toBe(10);
    });

    it("should perform Health check on User API", ()=> {

        dataProvider(testData, function(data , description) {

            console.log(" test data to be used ",data['id']);
            console.log(" description to be used ",description);


        } )

        return frisby.get(URI)
        .expect('status',200);

    });


    it("should validate response schema" , function() {

        return frisby.get(URI)
        .expect('status',200)
        .expect('jsonTypes',{schema})
        .then(function(res){

            const result=Joi.validate(res.json, schema);
            console.log("validation result-> " , result);
            if (result.error) {
                expect(false).toBeTruthy();
                console.log("Schema match-failed");
              }
            else{
                console.log("Schema match-passed");    
            }

            
        });

                      
    });

});

//----------Program ended------------------------
console.log("---------toq_test.js---FINISHED----");
