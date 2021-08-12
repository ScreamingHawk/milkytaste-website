import { ethers } from "ethers"
import { MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID, NETWORK_DETAILS } from "./constants"

const getNetworkDetails = () => {
	const network = window.ethereum.networkVersion
	if (network && NETWORK_DETAILS[network]) {
		return NETWORK_DETAILS[network]
	}
}

export const getNetworkName = () => {
	const details = getNetworkDetails()
	return details ? details.name : ''
}

export const getOpenseaUrl = () => {
	const details = getNetworkDetails()
	return details ? details.opensea : ''
}

let mainnetContracts, rinkebyContracts
try {
	rinkebyContracts = {
		addresses: require('../contracts/rinkeby/contract-address.json'),
		MilkToken: require('../contracts/rinkeby/MilkToken'),
	}
} catch (e) {
	// contracts not available. Fine
}
try {
	mainnetContracts = {
		addresses: require('../contracts/mainnet/contract-address.json'),
		MilkToken: require('../contracts/mainnet/MilkToken'),
	}
} catch (e) {
	// contracts not available. Fine
}

let contracts = {}
contracts[RINKEBY_NETWORK_ID] = rinkebyContracts
contracts[MAINNET_NETWORK_ID] = mainnetContracts

// Safely get the contract details for the connected network
export const getContract = name => {
	const network = window.ethereum.networkVersion
	if (network && contracts[network] && contracts[network][name]) {
		return contracts[network][name]
	}
	throw new Error(`Contracts not available on the ${getNetworkName()} network`)
}

export const getContractAddress = name => {
	const network = window.ethereum.networkVersion
	if (network && contracts[network] && contracts[network]['addresses']) {
		return contracts[network]['addresses'][name]
	}
	throw new Error(`Contracts not available on the ${getNetworkName()} network`)
}

export const getEthersContract = (name, provider) => new ethers.Contract(
	getContractAddress(name),
	getContract(name).abi,
	(new ethers.providers.Web3Provider(provider)).getSigner(0),
)

