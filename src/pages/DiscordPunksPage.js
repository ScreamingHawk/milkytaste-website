import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { CircleImg } from '../components/Image';
import ImageList from '../components/ImageList';
import PageContent from '../components/PageContent';

import punks from '../images/punks.png';
import punks_floor from '../images/punks_floor.png';
import punks_sale from '../images/punks_sale.png';
import punks_testimonial_2 from '../images/punks_testimonial_2.png';

const DiscordPunksPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>PunkTracker-X100</h1>
        <CircleImg src={punks} alt="PunkTracker logo" />
        <p>
          PunkTracker-X100 is a bot in Discord that reports listings, sales and floor price data from <a href="https://opensea.io">OpenSea</a>.
        </p>
        <p>
          Punks listens for listings and sales events, and posts them to the <a href="https://discord.gg/E7zMH4jby5"><FontAwesomeIcon icon={faDiscord} /> COVIDPunks! Discord</a>.
          <br />
          You can see the item sold, from and to who, prices in ΞETH and $USD.
          <br />
          The floor price (cheapest listing) is displayed as a channel notification meaning no user interaction required.
          <br />
          Specific metadata elements are visible in the embedded post and the colouring is styled to match the rarity.
        </p>
        <p>
          Listings, sales and big sales (those with a price multiples higher than the floor price!) are all posted in different channels.
          <br />
          The big sales are also posted to an associated Twitter account.
        </p>
        <ImageList>
          {punks_floor}
          {punks_sale}
          {punks_testimonial_2}
        </ImageList>
        <p>
          Check it out for yourself in the <a href="https://discord.gg/E7zMH4jby5"><FontAwesomeIcon icon={faDiscord} /> COVIDPunks! Discord</a>.
        </p>
      </PageContent>
    </>
  )
}

export default DiscordPunksPage;
