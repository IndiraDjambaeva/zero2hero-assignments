require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    bnbtestnet: {
      url: "https://morning-white-frog.bsc-testnet.discover.quiknode.pro/7f20cb2202be7ba2fb9bd3cf8d3d1b3cfbf237bf/",
      accounts: [
        "796298383bbad7fa783c90fef1390ee6fbbba82eccdced21d88d5e02e24fc33a",
      ],
    },
  },
  etherscan: {
    apiKey: "92YM2ACD6K68R5P6KW1JET6E5WI5MT7G8D",
  },
};
