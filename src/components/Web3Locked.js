import Web3Modal from "web3modal"
// import WalletConnectProvider from "@walletconnect/web3-provider"
import { useWeb3 } from '../context/Web3Context'
import Button from "./Button";

const providerOptions = {
	// walletconnect: {
	// 	package: WalletConnectProvider,
	// 	options: {
	// 		infuraId: "INFURA_ID"
	// 	}
	// }
}

const web3Modal = new Web3Modal({
	// network: "mainnet", // optional
	cacheProvider: true,
	providerOptions
});

const Web3Locked = ({ children }) => {
	const { state, dispatch } = useWeb3()

	const connect = async () => {
		web3Modal.clearCachedProvider()
		const provider = await web3Modal.connect()
		dispatch({ type: "SET_provider", payload: provider })
	}

	if (state.provider == null){
		return <Button onClick={connect}>Connect your Wallet</Button>
	}
	return (
		<>
			{children}
		</>
	)
}

export default Web3Locked
