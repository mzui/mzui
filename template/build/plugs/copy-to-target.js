
const fs = require('fs');
const path = require('path');
 

class CopyToTargetPlugin {
    options = {};
    constructor(options){
      this.options = options;
    }
    apply(compiler) {
      let self = this;
      compiler.plugin('done', function() {
        console.log('copy to target', self.options.patterns,  fs.existsSync(self.options.patterns));
        (self.options.patterns || []).forEach((item, i)=>{
          let from = item.from,
          to=item.to;
          let stat = fs.statSync(from);
          if(stat.isFile()){
            fs.createReadStream(from).pipe(fs.createWriteStream(to));
          }
        });
      });
    }
  }
  module.exports = CopyToTargetPlugin;