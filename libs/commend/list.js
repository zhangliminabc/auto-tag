const config = require('../configStore');

// 新增查看所有缓存的命令
module.exports = () => {
  const list = config.all;
  const info = Object.keys(list).map((key) => {
    return `${key}: ${list[key]}`;
  });
  console.info(info.join('\n'));
};
