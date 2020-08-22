console.log('process=======', process.env.View);
const loaderUtils = require('loader-utils');

module.exports = function (source, sourceMap, meta) {
  const options = loaderUtils.getOptions(this);
  let list = source.split('\n');
  list.forEach((line, i) => {
    if (/require\([^)]+#\{view\}/.test(line)) {
      list[i] = line.replace(/\#{view\}/g, options.view);
    }
  });
  return list.join('\n');
};
