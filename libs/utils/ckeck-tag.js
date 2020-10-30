const { getHeadTag } = require('../tagOpration');

const throwLog = require('./throw');

// 检查当前分支head上是否已经有tag了， 如果有tag证明当前分支的代码不是最新的代码
module.exports = () => {
  const hadTag = getHeadTag();
  if (hadTag) {
    throwLog(`当前分支已经有${hadTag}`);
  }
};
