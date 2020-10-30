const { execSync } = require('child_process');
const inquirer = require('inquirer');
const throwLog = require('./utils/throw');

const format = (str) => `${str}`.padStart(2, '0');
// 获取时间字符串
const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return [hour, minute].map(format).join('-');
};
// 获取日期字符串
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(format).join('-');
};
const tag1 = getDate();
const tag2 = getTime();

// eslint-disable-next-line consistent-return
module.exports = async () => {
  let tag = `v${getDate()}`;
  try {
    // 判断当前标签是否存在 /dev/null 目的是避免输出错误信息
    execSync(`git rev-parse ${tag} >/dev/null 2>&1`);
    tag = [tag, getTime()].join('_');
  } catch (error) {
    //
  }
  const { isOk } = await inquirer.prompt([
    {
      type: 'confirm',
      message: `使用${tag} 作为标签? `,
      name: 'isOk',
    },
  ]);
  if (isOk) {
    return tag;
  }
  throwLog('已取消');
};
