const {
  validataTag,
  getHeadTag,
  deleteOriginTag,
  deleteLocalTag,
} = require('../tagOpration');
const inquirer = require('inquirer');

const throwLog = require('../utils/throw');

// 删除tag命令
module.exports = async () => {
  // 获取当前head上是否有版本号
  const currentHeadTag = getHeadTag();
  validataTag(currentHeadTag);
  // 如果有就提示是否删除，如果没有就输入需要删除的版本
  const { isDelete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isDelete',
      message: `是否删除版本${currentHeadTag}?`,
    },
  ]);
  // 执行git删除远程和本地的tag
  if (isDelete) {
    try {
      deleteLocalTag(currentHeadTag);
      deleteOriginTag(currentHeadTag);
      console.info(
        `删除${currentHeadTag}成功!请运行git ls-remote --tags 或者 git tag查看已有的tag`
      );
    } catch (error) {
      console.error(
        `删除远程版本${currentHeadTag}失败，请确认是有删除远程tag的权限`
      );
    }
    process.exit();
  }
  throwLog('已取消删除');
};
