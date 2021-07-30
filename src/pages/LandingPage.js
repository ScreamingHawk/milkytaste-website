import { Link } from 'react-router-dom';
import LineLinks from '../components/LineLinks';
import Logo from '../components/Logo';
import PageContent from '../components/PageContent';

const LandingPage = () => {
  return (
    <PageContent>
      <Logo />
      <h1>MilkyTaste</h1>
      <p>A full stack developer building on the Ethereum blockchain.</p>
      <p>Check out the various products and services available.</p>
      <LineLinks>
        <Link to="/discord">Discord Bots</Link>
        <Link to="/minting">NFT Minting</Link>
        <Link to="/architecture">Architecture</Link>
        <Link to="/contact">Contact Me</Link>
      </LineLinks>
    </PageContent>
  )
}

export default LandingPage;
