const {
  execSync
} = require('child_process');

const throwLog = require('../utils/throw')

module.exports = {
  // 删除本地的tag
  deleteLocalTag: (tagName) => {
    execSync(`git tag --delete ${tagName}`);
  },
  // 删除远程的tag
  deleteOriginTag: (tagName) => {
    execSync(`git push origin :${tagName}`);
  },
  // 获取当前commit上的tag
  getHeadTag: () => {
    return execSync('git tag -l --points-at HEAD').toString();
  },
  // 获取远程git仓库地址
  getOriginUrl: () => {
    return execSync('git remote get-url origin').toString();
  },
  // 拉取远程代码
  execPullRebase: () => {
    execSync('git pull --rebase');
  },
  // 获取当前的分支名字
  getCurrentBranch: () => {
    return execSync('git symbolic-ref --short HEAD').toString();
  },
  // 验证tagName是否有值
  validataTag: (tagName) => {
    if (!tagName) {
      throwLog('需要删除的版本名字不能为空')
    }
  },
  // 获取远程的项目名字
  getProjectName: (originUrl) => {
    return originUrl.match(/(?<=com[:|\/]).*?(?=.git)/gmi)[0]
  }
}