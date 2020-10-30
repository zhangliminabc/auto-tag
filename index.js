#!/usr/bin/env node

const { execSync } = require('child_process');
const clipboardy = require('clipboardy');
const program = require('commander');

const isGitRepository = require('./libs/is-git-repository');
const checkStatusClean = require('./libs/check-status-clean');
const getTag = require('./libs/get-tag');
const isEmptyHistory = require('./libs/is-empty-history');
const checkGitVersion = require('./libs/git-version-check');
// 检查tag
const checkedTag = require('./libs/utils/ckeck-tag');
// 检查分支
const checkMaster = require('./libs/utils/check-master');
// 删除tag
const deleteTag = require('./libs/commend/delete-tag');
// 缓存名字
const configName = require('./libs/commend/get-remote-name');
// 清除缓存名字
const clearName = require('./libs/commend/clear-config');
const checkedList = require('./libs/commend/list');

(async () => {
  program
    .option('-d, --delete', '删除远程tag和本地tag')
    .option('-r, --rename', '修改项目的名字')
    .option('-c, --clear', '查看所有缓存的项目的名字')
    .option('-l, --list', '查看所有的名字')
    .parse(process.argv);
  if (program.delete) {
    await deleteTag();
  } else if (program.rename) {
    const name = await configName(true);
    console.info(`重命名成功， ${name}`);
    process.exit();
  } else if (program.clear) {
    await clearName();
    console.info('清除所有名字成功');
    process.exit();
  } else if (program.list) {
    checkedList();
    process.exit();
  }
  // 判断git版本，版本过低部分命令不支持，新版本的支持汉化
  await checkGitVersion();
  // 判断是否git，避免在非git目录误用，及时中断并提示。
  isGitRepository();
  // 判断是否是刚初始化的git，如果没任何commit，是没办法执行git tag打标签的
  isEmptyHistory();
  // 检测master分支，避免标签
  checkMaster();
  // 先执行一遍拉取代码，避免打包的不是最新版。
  execSync('git pull --rebase');
  // 检测工作区是否干净，避免未提交的代码
  checkStatusClean();
  // 检查当前分支上是否有tag
  checkedTag();
  const name = await configName();
  const tag = await getTag();
  execSync(`git tag ${tag}`);
  console.info(`添加成功, 名字: ${name}, tag: ${tag}`);
  try {
    execSync(`git push origin ${tag}`);
    console.info('成功推送到服务端');
  } catch (error) {
    console.warn('标签推送服务器失败，请确认是否有权限推送，或者网络连接');
    console.error(error.message);
    execSync(`git tag --delete ${tag}`);
    console.error(`本地标签已删除：${tag}`);
    process.exit(0);
  }
  clipboardy.writeSync(`tag: ${tag}, Jenkins: ${name}`);
  console.info('标签名称已保存到剪切板');
  console.warn(
    [
      '如果要删除该标签，运行以下命令删除该标签，分别删除本地和远程标签:',
      `git push origin :${tag} && git tag --delete ${tag}`,
    ].join('\n')
  );
})();
