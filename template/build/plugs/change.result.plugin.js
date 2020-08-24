/**
 * 本插件解决打包编译后的错误
 * @param {*} list
 */

const fs = require('fs');
const path = require('path');
const ConcatSource = require('webpack-sources').ConcatSource;
const Source = require('webpack-sources');
function resol(list) {
  for (let i in list) {
    let val = list[i];
    let t = typeof val;
    console.log('---------------');
    if (t == 'string') {
      /*        if(val.indexOf('ramda_1.default.curry')>=0){
                list[i] = val.replace('const desc = ramda_1.default.curry', "ramda_1.default = ramda_1.default || ramda_1;\r\nconst desc = ramda_1.default.curry");
            }else if(val.indexOf(`var prebuilds = path.join(dir, 'prebuilds', platform + '-' + arch)`)>=0){
                list[i] = val.replace(`var prebuilds = path.join(dir, 'prebuilds', platform + '-' + arch)`, `var prebuilds = path.join(__dirname, 'prebuilds', platform + '-' + arch)`)
            } */
    } else {
      resol(val);
    }
  }
}
console.log('.........', Source);
class ChangeResultPlugin {
  apply(compiler) {
    //console.log('>>>>>>>>>', compiler.hooks.emit.tap, compiler.hooks.make.tap);
    console.log('>>>>>process.env.View', process.env.View);
    compiler.hooks.make.tap('ChangeResultPlugin', (compilation, callback) => {
      //console.log('=================', compilation.hooks);//succeedModule
      compilation.hooks.buildModule.tap('ChangeResultPlugin', (chunk) => {
        /*  for(let key in chunks){
                console.log("key===", key)
            } */
        /*    if(/\.\/common\/ui/.test(chunk.rawRequest)){
                console.log("\r\n>>>>", chunk, '\r\n')
            } */
        if (/\.\/store(\/index)?/.test(chunk.rawRequest)) {
          //chunk._source._value
         // console.log('\r\n>>>>', chunk, '\r\n');
          let text = fs.readFileSync(chunk.userRequest, 'utf8').toString();
          let list = text.split('\n');

          //console.log('txt ', list);
          list.forEach((line, i) => {
            if (/require\([^)]+#\{view\}/.test(line)) {
              list[i] = line.replace(/\#{view\}/g, process.env.View);
              console.log('---------->>', list[i]);
            }
          });
          /*           chunk._source._sourceMap.sourcesContent.forEach((line, i)=>{
                    if(/require\([^)]+#\{view\}/.test(line)){
                        chunk._source._sourceMap.sourcesContent[i] = line.replace(/\#{view\}/g, process.env.View);
                        console.log('---------->>', chunk._source._sourceMap.sourcesContent[i])
                    }
                });
                chunk._source._value = chunk._source._sourceMap.sourcesContent.join(''); */
          //console.log(".....\r\n\r\n", chunk, '\r\n\r\n')
        }else{
           
        }
      });
      /*      const manifest = {};
      let entryFile;
      for (const name of Object.keys(compilation.assets)) {
        entryFile = name;
        break;
      }
      let source = compilation.assets[entryFile];
      resol(source._source.children); */
      callback && callback();
    });

    /*     compiler.hooks.compilation.tap('ChangeResultPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap('ChangeResultPlugin', (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((filename) => {
            console.log('>>>>filename', filename);
            // 判断具体要修改的文件，假设简单通过 chunk 的文件名称判断入口
            if (filename && filename.indexOf('index') > -1) {
              // 在源码头尾各增加内容
              compilation.assets[filename] = new ConcatSource(
                `console.log('code before')`,
                compilation.assets[filename],
                `console.log('code after')`,
              );
            }
          });
        });
      });
    }); */
  }
}
module.exports = ChangeResultPlugin;
