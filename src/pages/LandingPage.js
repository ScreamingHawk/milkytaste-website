import { Link } from 'react-router-dom';
import LineLinks from '../components/LineLinks';
import Logo from '../components/Logo';
import PageContent from '../components/PageContent';

const LandingPage = () => {
  return (
    <PageContent>
      <Logo />
      <h1>MilkyTaste</h1>
      <p>check out the various products and services on offer</p>
      <LineLinks>
        <Link to="/discord">Discord Bots</Link>
        <Link to="/thanks">Say Thanks</Link>
      </LineLinks>
    </PageContent>
  )
}

export default LandingPage;
