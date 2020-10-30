const { execSync } = require('child_process');

/**
 * 判断是否有git提交，不然对刚初始化的项目执行git tag会报错的
 * 这里是判断总的commit，可能会存在其他分支有提交，但是该分支还是没有任何提交的情况。等遇到再处理
 */
module.exports = () => {
  const num = +execSync('git rev-list --all --count').toString().trim();
  if (num === 0) {
    console.error(
      `当前目录${process.cwd()}，还没有commit提交，请确认是否是空项目`
    );
    process.exit(0);
  }
};
