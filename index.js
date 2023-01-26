const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const directory=args[0]
var extension=args[1]
if(args.length===0 || args===null){
    console.log("!!!!please provide the directory and file extension i.e .js ");
    return
}

if(extension===null)
{
    console.log('Using default .js extension as no proper extension provided!');
}
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  if(files.length===1){
    if(path.extname(files[0])===extension)
 {fix_file(files[0],directory);}
 else 
   {console.log(`No files found with given ${extension} extension in ${directory}`);}
  }
  else{
  files.forEach(file => {
    if (path.extname(file) === extension) {
      fix_file(file,directory);
    }
  });
}
});


const fix_file=async (file,directory)=>{

    fs.readFile(path.join(directory, file), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const commented = data.replace(/console\.log\(.*\);/g, '// $&');
        fs.writeFile(path.join(directory, file), commented, 'utf8', err => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`Commented console.log() statements in ${file}.`);
          console.log("Happ production :)")
        });
      });

}