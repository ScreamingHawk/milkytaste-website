import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import { CircleImg } from '../components/Image';
import Web3Locked from '../components/Web3Locked';
import Button from '../components/Button';
import { useWeb3 } from '../context/Web3Context';
import { getOpenseaUrl, getContractAddress, getEthersContract } from "../util/contracts";
import { trimAddress } from "../util/stringUtils";
import { ERROR_CODE_TX_REJECTED_BY_USER, MAINNET_NETWORK_ID, RINKEBY_NETWORK_ID } from '../util/constants';
import { utils } from 'ethers';

const Tilt = styled(PageContent)`
	& * {
		transform: rotate(-2deg);
	}
	& :nth-child(even) {
		transform: rotate(2deg);
	}
`

const MilkTokenPage = () => {
	const { state: {provider, address, chainId} } = useWeb3()
	const [loadingTokenDetails, setLoadingTokenDetails] = useState(false)
	const [tokenDetails, setTokenDetails] = useState(null)
	const [isMinting, setIsMinting] = useState(false)
	const [mintingError, setMintingError] = useState(null)
	const [networkError, setNetworkError] = useState(null)

	const updateTokenDetails = async () => {
		setLoadingTokenDetails(true)
		let details = {}
		try {
			const milkToken = getEthersContract("MilkToken", provider)
			const tokenPrice = await milkToken.tokenPrice()
			details.tokenPrice = tokenPrice
			const supplyCap = await milkToken.supplyCap()
			details.supplyCap = supplyCap.toNumber()
			const totalSupply = await milkToken.totalSupply()
			details.totalSupply = totalSupply.toNumber()
			// Do this last for error handling
			const tokenId = await milkToken.tokenOfOwnerByIndex(address, 0)
			details.hasToken = tokenId.toNumber()
		} catch (err) {
			// No tokens
		} finally {
			setTokenDetails(details)
			setLoadingTokenDetails(false)
		}
	}

	useEffect(() => {
		if (provider && address) {
			if (chainId !== RINKEBY_NETWORK_ID && chainId !== MAINNET_NETWORK_ID) {
				// Recommend Rinkeby
				setNetworkError("Invalid network selected.\nPlease change to Rinkeby!")
			} else {
				setNetworkError(null)
				updateTokenDetails()
			}
		}
	}, [provider, address, chainId])

	const mint = async () => {
		if (provider && address) {
			const milkToken = getEthersContract("MilkToken", provider)
			try {
				const tx = await milkToken.mintToken(address, {value: tokenDetails.tokenPrice.toNumber()})
				// Wait for mint to succeed
				setMintingError(null)
				setIsMinting(true)
				const reciept = await tx.wait()
				if (reciept?.status !== 0) {
					// Success
					updateTokenDetails()
				} else {
					// Error
					throw new Error("Transaction failed")
				}
			} catch (err) {
				console.log('ERROR: '+err)
				if (err?.code === ERROR_CODE_TX_REJECTED_BY_USER) {
					setMintingError("Transaction rejected")
				} else {
					setMintingError("Transaction failed")
				}
			} finally {
				setIsMinting(false)
			}
		}
	}

	let btn = isMinting ? <p className="red">Waiting for confirmation...</p> : <Button onClick={mint}>Mint Milk Token</Button>

	return (
		<>
			<Header hasWave={true} />
			<Tilt>
				<CircleImg src="https://milkytaste.xyz/milktoken/placeholder.png" alt="Milk Token" />
				<Web3Locked>
					{loadingTokenDetails ? <p>Loading...</p> : (
						networkError ? (
							<p className="red">{networkError.split('\n').map(s => <>{s}<br/></>)}</p>
						) : isMinting ? (
							<p>Waiting for confirmation...</p>
						) : (
							<>
								<p>Currently minted: {tokenDetails?.totalSupply}/{tokenDetails?.supplyCap}</p>
								{tokenDetails?.hasToken ? (
									<p>
										You own
										{' '}
										<a href={`${getOpenseaUrl()}/assets/${getContractAddress("MilkToken")}/${tokenDetails.hasToken}`}>Milk Token #{tokenDetails.hasToken}</a>
										!
									</p>
								) : (
									<>
										<p>
											Mint a Milk Token to <code>{trimAddress(address)}</code>
										</p>
										<p>
											{btn}
										</p>
										{mintingError && <p className="red">{mintingError}</p>}
									</>
								)}
							</>
						)
					)}
				</Web3Locked>
				<p>
					Milk Tokens are a token of appreciation from MilkyTaste.
					<br/>
					Mint your token
					{tokenDetails?.tokenPrice ? ` for ${utils.formatEther(tokenDetails.tokenPrice)}Ξ ` : ' '}
					and then <Link to="/contact">contact me</Link> to have your token revealed.
				</p>
				<p>
					Each wallet can only hold <b>1</b> Milk Token.
				</p>
				<p>Check them out on <a href={`${getOpenseaUrl()}/collection/milktoken`}>OpenSea</a>.</p>
			</Tilt>
		</>
	)
}

export default MilkTokenPage;
