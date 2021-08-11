// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useContext, useReducer } from 'react';

const Web3Context = createContext()

const web3Reducer = (state, action) => {
	switch (action.type) {
		case 'set': {
			return {provider: action.payload}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const Web3Provider = ({children}) => {
	const [state, dispatch] = useReducer(web3Reducer, {provider: null})
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
