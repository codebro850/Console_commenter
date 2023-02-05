#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
var directory=args[0]
var extension=args[1]
var ignoreDirs = ['node_modules'];

var ignore=false
args.forEach((element,i) => {
    if(element==="-ignore"){
       ignore=true
    }
    else if(ignore){
        ignoreDirs.push(element);
    }
});

if(args.length===0 || args===null){
   directory="./";
   extension=".js";
}

if(extension===null)
{
   extension=".js"
}
// console.log(extension, directory)
//V1.0.2
const search_file=(dir,level)=> {
  fs.readdirSync(dir).forEach(file => {
      const filepath = path.join(dir, file);
      if (fs.lstatSync(filepath).isDirectory() && !ignoreDirs.includes(file)) {
          search_file(filepath,level+1);
      } else if (path.extname(file) === extension && !ignoreDirs.includes(file)) {
        console.log(`${'  '.repeat(level)}${filepath}`);
        fix_file(filepath);
      }
  });
}

const fix_file=(filepath)=>{

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const commented = data.replace(/console\.log\(.*\);/g, '// $&').replace(/console\.log\(.*\)/g, '// $&');
        fs.writeFile(filepath, commented, 'utf8', err => {
          if (err) {
            console.error(err);
            return;
          }
         console.log(`fixed file ${filepath}`);
          return;
        });
      });

}



// V1.0.1
fs.readdir(directory, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  else{
   search_file(directory,0);
  }
});