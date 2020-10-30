const configstore = require("configstore");
const packageJson = require('../../package.json');
const config = new configstore(packageJson.name);

module.exports = config