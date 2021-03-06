// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer, useEffect } from 'react';

const Web3Context = createContext()

const web3Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_provider': {
			const provider = action.payload
			return {
				...state,
				provider,
				address: provider?.selectedAddress,
				chainId: window?.ethereum?.networkVersion,
			}
		}
		case 'SET_address': {
			return {
				...state,
				address: action.payload,
			}
		}
		case 'SET_chainId': {
			return {
				...state,
				chainId: action.payload,
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const Web3Provider = ({children}) => {
	const [state, dispatch] = useReducer(web3Reducer, {provider: null, address: null})

	// Network listener
	useEffect(() => {
		const onChainChanged = async chainId => {
			const _chainId = `${parseInt(Number(chainId), 10)}`
			dispatch({
				type: 'SET_chainId',
				payload: _chainId,
			})
		}
		if (typeof window?.ethereum?.on === 'function') {
			window.ethereum.on('chainChanged', onChainChanged)
		}
		return () => {
			if (typeof window?.ethereum?.off === 'function') {
				window.ethereum.off('chainChanged', onChainChanged)
			}
		}
	})

	// Address listener
	useEffect(() => {
		const onAccountChanged = async addrs => {
			dispatch({
				type: 'SET_address',
				payload: addrs[0],
			})
		}
		if (typeof window?.ethereum?.on === 'function') {
			window.ethereum.on('accountsChanged', onAccountChanged)
		}
		return () => {
			if (typeof window?.ethereum?.off === 'function') {
				window.ethereum.off('accountsChanged', onAccountChanged)
			}
		}
	})

	const value = { state, dispatch }
	return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

const useWeb3 = () => {
	const context = useContext(Web3Context)
	if (context === undefined) {
		throw new Error('useWeb3 must be used within a Web3Provider')
	}
	return context
}

export { Web3Provider, useWeb3 }
