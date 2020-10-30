const binVersion = require('bin-version');
const semver = require('semver');

/**
 * 判断git版本，版本过低部分命令不支持，新版本的支持汉化
 */
module.exports = async () => {
  const version = await binVersion('git');
  // 低于2.20.0，就终止
  if (semver.lt(version, '2.20.0')) {
    console.error(
      `当前git 版本:${version}过低，请安装最新版本git 官网地址: https://git-scm.com/downloads。 mac 用户请直接执行brew upgrade git更新`
    );
    process.exit(0);
  }
};
