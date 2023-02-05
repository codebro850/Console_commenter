This package helps developers to get rid of manually commenting console.log in files before going to production.

**To use this package**

`npm install -g console_comment`

`console_comment <directory/> .<extension>`

If want to ignore the some directory or file then use this
**Here you can ignore n number of directory or files inside the working directory**

`console_comment <directory/> .<extension> -ignore <file_name_with_extension> <directory>`

example:
`console_comment "server/" .js`

or

`console_comment "server/" .js -ignore file.js folder1 file2.js`

**Note**: **If No argument is given then it will default directory which is your working directory and file extension as .js**

Then relax and seat back, Let me handle your console.

Happy production ❤
