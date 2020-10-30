const { execSync } = require('child_process');

/**
 * 检查git工作区是否有未提交的代码，如果有，则终止并提示
 */
module.exports = () => {
  const statusInfo = execSync('git status --porcelain').toString().trim();
  if (statusInfo) {
    console.error('当前工作区还有未提交代码，请提交完毕再执行auto-tag命令');
    // eslint-disable-next-line no-console
    console.log(statusInfo);
    process.exit(0);
  }
};
