var ReactExample = artifacts.require("./ReactExample.sol");

module.exports = function(deployer) {
  deployer.deploy(ReactExample, {gas: 6700000});
};
