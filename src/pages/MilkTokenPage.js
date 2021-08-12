import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import { CircleImg } from '../components/Image';
import Web3Locked from '../components/Web3Locked';
import Button from '../components/Button';
import { useWeb3 } from '../context/Web3Context';
import { getOpenseaUrl, getContractAddress, getEthersContract } from "../util/contracts";
import { trimAddress } from "../util/addressUtil";

const MilkTokenPage = () => {
	const { state: {provider, address} } = useWeb3()
	const [loadingTokenList, setLoadingTokenList] = useState(true)
	const [hasToken, setHasToken] = useState(null)

	useEffect(() => {
		if (provider && address) {
			const milkToken = getEthersContract("MilkToken", provider)
			console.log("Getting token")
			milkToken.tokenOfOwnerByIndex(address, 0).then(tokenId => {
				setHasToken(tokenId.toNumber())
				setLoadingTokenList(false)
			}).catch(() => {
				// No tokens
				setLoadingTokenList(false)
			})
		}
	}, [provider, address])

	const mint = () => {
		if (provider && address) {
			const milkToken = getEthersContract("MilkToken", provider)
			milkToken.mintToken(address)
			//TODO And then update the page
		}
	}

	return (
		<>
			<Header hasWave={true} />
			<PageContent>
				<h1>Milk Token</h1>
				<CircleImg src="https://milkytaste.xyz/milktoken/placeholder.png" alt="Milk Token" />
				<p>
					<i><b>Note:</b> This feature is only available on Rinkeby!</i>
				</p>
				<p>
					Milk Tokens are a token of affection from MilkyTaste.
					<br/>
					Mint your token for <b>FREE</b> and then <Link to="/contact">contact me</Link> to have your token revealed.
				</p>
				<Web3Locked>
					{loadingTokenList ? <p>Loading...</p> : (
						hasToken ? (
							<p>
								You already own
								{' '}
								<a href={`${getOpenseaUrl()}/assets/${getContractAddress("MilkToken")}/${hasToken}`}>Milk Token #{hasToken}</a>
							</p>
						) : (
							<>
								<p>
									Mint a Milk Token to <code>{trimAddress(address)}</code>
								</p>
								<p>
									<Button onClick={mint}>Mint</Button>
								</p>
							</>
						)
					)}
					
				</Web3Locked>
			</PageContent>
		</>
	)
}

export default MilkTokenPage;
