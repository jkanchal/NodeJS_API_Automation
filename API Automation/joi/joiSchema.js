
var fs = require('fs')
var concat = require('concat-stream')
var joiMachine = require('joi-machine')
 
// data.json: {"foo": {}, "bar": 45, "baz": ["foob"]}
fs.createReadStream(__dirname + '/joiData.json')
  .pipe(joiMachine())
  .pipe(concat({encoding: 'string'}, console.log))