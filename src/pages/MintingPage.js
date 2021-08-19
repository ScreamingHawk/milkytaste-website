import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import { CircleImg } from '../components/Image';

import coolcat from '../images/coolcat3318.png';

const MintingPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Minting</h1>
        <CircleImg src={coolcat} alt="Cool Cat" />
        <p>
          Are you an artist or designer looking for a partner to create the next hit avatar NFT project?
        </p>
        <p>
          MilkyTaste is able to create an NFT minting project from the ground up.
          <br />
          This includes the smart contracts, front end website and image generation tools.
        </p>
        <p>
          <Link to="/milktoken">Want a Milk Token?</Link>
        </p>
        <p>
          Please <Link to="/contact">contact me</Link> to discuss your master plan.
        </p>
      </PageContent>
    </>
  )
}

export default MintingPage;
