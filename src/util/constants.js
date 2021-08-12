// https://docs.metamask.io/guide/ethereum-provider.html#properties
export const HARDHAT_NETWORK_ID = '1337'
export const MAINNET_NETWORK_ID = '1'
export const RINKEBY_NETWORK_ID = '4'

export const NETWORK_DETAILS = {
	1337: {
		name: 'Localhost',
		opensea: 'http://localhost',
	},
	1: {
		name: 'Ethereum Mainnet',
		opensea: 'https://opensea.io',
	},
	4: {
		name: 'Rinkeby Test Network',
		opensea: 'https://testnets.opensea.io',
	},
}

// Error code that user canceled a transaction
export const ERROR_CODE_TX_REJECTED_BY_USER = 4001
