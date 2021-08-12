const hre = require("hardhat");

async function main() {
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners()
	console.log(
		'Deploying the contracts with the account:',
		await deployer.getAddress()
	)

	console.log(
		'Account balance before:',
		(await deployer.getBalance()).toString()
	)

	const MilkToken = await hre.ethers.getContractFactory("MilkToken");
	const milkToken = await MilkToken.deploy();

	await milkToken.deployed();

	console.log(
		'Account balance after:',
		(await deployer.getBalance()).toString()
	)

	console.log("MilkToken deployed to:", milkToken.address);

	saveToFrontend(milkToken.address, network.name)
}

function saveToFrontend(address, networkName) {
	const fs = require('fs')
	const contractsDir = `${__dirname}/../../src/contracts/${networkName.toLowerCase()}`

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir)
	}

	// Create address file
	const fileData = {
		"MilkToken": address,
	}
	fs.writeFileSync(
		`${contractsDir}/contract-address.json`,
		JSON.stringify(fileData, undefined, 2)
	)

	const Artifact = artifacts.readArtifactSync("MilkToken")

	fs.writeFileSync(
		`${contractsDir}/MilkToken.json`,
		JSON.stringify(Artifact, null, 2)
	)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
