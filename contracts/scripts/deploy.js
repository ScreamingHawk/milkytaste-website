const hre = require("hardhat");

async function main() {
	// await hre.run('compile');

	const MilkToken = await hre.ethers.getContractFactory("MilkToken");
	const milkToken = await MilkToken.deploy();

	await milkToken.deployed();

	console.log("MilkToken deployed to:", greeter.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
