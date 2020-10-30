const { execSync } = require('child_process');

/**
 * 检测当前目录是否存在git仓库。
 * 有时候目录在项目的子目录中，所以通过判断.git目录是否存在不合理。只能使用--git-dir
 */
module.exports = () => {
  try {
    execSync('git rev-parse --git-dir >/dev/null 2>&1');
  } catch (error) {
    console.error(`当前目录:${process.cwd()},并不存在git仓库，请确认`);
    process.exit(0);
  }
};
