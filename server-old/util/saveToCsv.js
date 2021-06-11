// util to try to export things to a csv that's useable by normals

let async     = require('async');
let fs        = require('fs');

// headers: array of keys to use for the headers, and to decide what values to display from objects
// objects: array of objects
// if you pass an -o flag, you can name the output file. otherwise output.csv

exports.generate = (headers, objects, fileName = 'output', cb) => {
  let output = headers.join(',') + '\n';
  console.log("headers", headers);
  // lots of ways to do this, but this way is fun
  output += objects.map(obj => {
    let nextLine = ""
    for(key of headers) {
      nextLine += obj[key] ? '"' + obj[key] + '"' : ''
      nextLine += ','
    }
    return nextLine;
  }).join('\n')

  // console.log(output);

  // NOTE:  this is removed here so that it can be determined in the higher level script 
  // if(process.argv.includes("-o")) {
  //   const fileName = process.argv[process.argv.indexOf("-o") + 1];
  //   fs.writeFileSync(`./util_output/${fileName}`, output)
  // } else {
  //   fs.writeFileSync('./util_output/output.csv', output)
  // }
  
  fs.writeFileSync(`./util/output/${fileName}.csv`, output)

  cb();



}