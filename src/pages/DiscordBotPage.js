import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import PageContent from '../components/PageContent';
import Logo from '../components/Logo';

const BlurpleFA = styled(FontAwesomeIcon)`
  color: #5865F2;
`

const DiscordBotPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Discord Bots</h1>
        <Logo><BlurpleFA icon={faDiscord} size="xl"/></Logo>
        <p>
          MilkyTaste creates and runs a number of Discord bots for blockchain communities.
          <br />
          These bots integrate with the Ethereum blockchain, OpenSea and other applications.
          <br />
          Each bot is custom built for the project, these are not cookie cutter solutions.
        </p>
        <p>
          <Link to="/discord/cosmos">Cosmos <small>(read more)</small></Link>, a bot for querying asteroid data and events in <a href="https://www.influenceth.io/">Influence</a>.
        </p>
        <p>
          <Link to="/discord/punks">PunkTracker-X100 <small>(read more)</small></Link>, a bot for OpenSea listings, sales and floor prices of <a href="https://covidpunks.com/">COVIDPunks!</a>.
        </p>
        <p>
          <Link to="/discord/codex">Codex <small>(read more)</small></Link>, another bot that tracks OpenSea sales, this time for <a href="https://www.parallel.life/">Parallel</a>.
        </p>
        <p>
          If you are interested in a Discord bot for your project, <Link to="/contact">contact me</Link> for more info.
        </p>
      </PageContent>
    </>
  )
}

export default DiscordBotPage;
