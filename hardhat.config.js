/** @type import('hardhat/config').HardhatUserConfig */
 require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

module.exports = {
  networks: {
    hardhat: {},
    alchemy: {
      url: "<ALCHEMY_RPC_URL>",
      accounts: ["mrpKMmQaxUqE6xWX4QrQCVhzelq2-aFc"]
    }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "<ETHERSCAN_API_KEY>"
  }
};


