import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageContent from '../components/PageContent';

const DiscordBotPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Discord Bots</h1>
        <p>
          MilkyTaste creates and runs a number of Discord bots for blockchain communities.
          <br />
          These bots integrate with the Ethereum blockchain, OpenSea and other applications.
        </p>
        <p>
          <Link to="/discord/cosmos">Cosmos <small>(read more)</small></Link>, a bot for querying asteroid data and events in <a href="https://www.influenceth.io/">Influence</a>.
        </p>
        <p>
          <Link to="/discord/codex">Codex <small>(read more)</small></Link>, a bot that tracks OpenSea sales for <a href="https://www.parallel.life/">Parallel</a>.
        </p>
        <p>
          If you are interested in a Discord bot for your project, <Link to="/contact">contact me</Link> for more info.
        </p>
      </PageContent>
    </>
  )
}

export default DiscordBotPage;
