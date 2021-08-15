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
import { trimAddress } from "../util/addressUtil";
import { ERROR_CODE_TX_REJECTED_BY_USER } from '../util/constants';

const Tilt = styled(PageContent)`
	& * {
		transform: rotate(-2deg);
	}
	& :nth-child(even) {
		transform: rotate(2deg);
	}
`

const MilkTokenPage = () => {
	const { state: {provider, address} } = useWeb3()
	const [loadingTokenList, setLoadingTokenList] = useState(true)
	const [hasToken, setHasToken] = useState(null)
	const [isMinting, setIsMinting] = useState(false)
	const [mintingError, setMintingError] = useState(null)

	const updateTokenList = () => {
		setLoadingTokenList(true)
		const milkToken = getEthersContract("MilkToken", provider)
		milkToken.tokenOfOwnerByIndex(address, 0).then(tokenId => {
			setHasToken(tokenId.toNumber())
			setLoadingTokenList(false)
		}).catch(() => {
			// No tokens
			setLoadingTokenList(false)
		})
	}

	useEffect(() => {
		if (provider && address) {
			updateTokenList()
		}
	}, [provider, address])

	const mint = async () => {
		if (provider && address) {
			const milkToken = getEthersContract("MilkToken", provider)
			try {
				const tx = await milkToken.mintToken(address)
				// Wait for mint to succeed
				setMintingError(null)
				setIsMinting(true)
				const reciept = await tx.wait()
				if (reciept?.status !== 0) {
					// Success
					updateTokenList()
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

	let btn = isMinting ? <p>Waiting for confirmation...</p> : <Button onClick={mint}>Mint Milk Token</Button>

	return (
		<>
			<Header hasWave={true} />
			<Tilt>
				<CircleImg src="https://milkytaste.xyz/milktoken/placeholder.png" alt="Milk Token" />
				<p>
					<i><b>Note:</b> This feature is only available on Rinkeby!</i>
				</p>
				<Web3Locked>
					{loadingTokenList ? <p>Loading...</p> : (
						isMinting ? (
							<p>Waiting for confirmation...</p>
						) : hasToken ? (
							<p>
								You own
								{' '}
								<a href={`${getOpenseaUrl()}/assets/${getContractAddress("MilkToken")}/${hasToken}`}>Milk Token #{hasToken}</a>
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
								{mintingError && <p>{mintingError}</p>}
							</>
						)
					)}
					
				</Web3Locked>
				<p>
					Milk Tokens are a token of appreciation from MilkyTaste.
					<br/>
					Mint your token for <b>FREE</b> and then <Link to="/contact">contact me</Link> to have your token revealed.
				</p>
				<p>
					Each wallet can only hold <b>1</b> Milk Token.
				</p>
			</Tilt>
		</>
	)
}

export default MilkTokenPage;
