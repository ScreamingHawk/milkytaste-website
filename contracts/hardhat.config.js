require('dotenv').config()
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const {
	ALCHEMY_API_KEY,
	ETHERSCAN_API_KEY,
	RINKEBY_PRIVATE_KEY,
} = process.env

// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	networks: {
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
			accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		currency: 'NZD',
		gasPrice: 40,
	},
};
