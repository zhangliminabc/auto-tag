const inquirer = require('inquirer');
const {
  getOriginUrl,
  getProjectName
} = require('../tagOpration')
const config = require('../configStore')

const throwLog = require('../utils/throw')

// 缓存远程Jenkins的名字
module.exports = async (isReName = false) => {
  // 获取远程gitlab的地址
  const url = getOriginUrl();
  // 匹配远程gitlab地址中的项目名称
  const projctName = getProjectName(url)
  // 重命名删除对应的项目名
  if (isReName) {
    config.delete(projctName);
  }
  const value = config.get(projctName) || "";
  if (value) return value
  // 提示输入Jenkins的名字
  const {
    name
  } = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: '请输入远程Jenkins的名字：'
  }]);
  if (!name) {
    throwLog('远程Jenkins名字不能为空，请执行auto-tag -r或者auto-tag更新Jenkins名字')
  }
  config.set(projctName, name);
  return config.get(projctName) || "";
}