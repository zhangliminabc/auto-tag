// 提示错误信息，并退出
module.exports = (message) => {
  if (message) {
    console.error(message);
  }
  process.exit();
};
