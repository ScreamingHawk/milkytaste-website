import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import { CircleImg } from '../components/Image';

import coolcat from '../images/coolcat3318.png';
import Web3Locked from '../components/Web3Locked';
//FIXME Replace with placeholder

const MilkTokenPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Milk Token</h1>
        <CircleImg src={coolcat} alt="Milk Token" />
        <p>
          Milk Tokens are a unique NFT.
        </p>
        <Web3Locked>
          <p>
            Wallet connected
          </p>
        </Web3Locked>
        <p>
          <Link to="/contact">Contact me</Link> to have your token revealed.
        </p>
      </PageContent>
    </>
  )
}

export default MilkTokenPage;
