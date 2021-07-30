import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { CircleImg } from '../components/Image';
import ImageList from '../components/ImageList';
import PageContent from '../components/PageContent';

import cosmos from '../images/cosmos.png';
import cosmos_events from '../images/cosmos_events.png';
import cosmos_owned from '../images/cosmos_owned.png';
import cosmos_testimonial from '../images/cosmos_testimonial.png';

const DiscordCosmosPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Cosmos</h1>
        <CircleImg src={cosmos} alt="Cosmos logo" />
        <p>
          Cosmos is a bot in Discord that listens for asteroid purchase and scan events in game.
        </p>
        <p>
          You can use commands to pull information about asteroids (ownership, rarity, etc) from the blockchain and <a href="https://opensea.io">OpenSea</a>.
          <br />
          You can link your address to get additional, personalised user aware commands and tags.
        </p>
        <ImageList>
          {cosmos_owned}
          {cosmos_events}
          {cosmos_testimonial}
        </ImageList>
        <p>
          Check it out for yourself in the <a href="https://discord.gg/67BXUzDr3M"><FontAwesomeIcon icon={faDiscord} /> Influence Discord</a>.
        </p>
      </PageContent>
    </>
  )
}

export default DiscordCosmosPage;
