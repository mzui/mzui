const { execFile, stdout, spawn  } = require('child_process');
const path = require('path');

execFile(
  path.join(__dirname, 'run-android.bat'),
  [],
  {
    cwd: path.resolve('android'),
    shell: true
  },
  (error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
  },
); 
 