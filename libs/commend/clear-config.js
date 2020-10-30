const inquirer = require('inquirer');
const config = require('../configStore');

const throwLog = require('../utils/throw')

// 删除所有缓存的enkins名字
module.exports = async () => {
  const {
    isDelete
  } = await inquirer.prompt([{
    type: 'confirm',
    message: '确定删除所有Jenkins？',
    name: 'isDelete'
  }]);
  if (isDelete) {
    config.clear();
    process.exit();
  }
  throwLog('清除所有Jenkins的名字成功')
}