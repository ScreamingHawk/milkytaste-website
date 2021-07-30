import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { CircleImg } from '../components/Image';
import ImageList from '../components/ImageList';
import PageContent from '../components/PageContent';

import codex from '../images/codex.jpg';
import codex_sale from '../images/codex_sale.png';
import codex_testimonial from '../images/codex_testimonial.png';
import codex_testimonial_2 from '../images/codex_testimonial_2.png';

const DiscordCodexPage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Codex</h1>
        <CircleImg src={codex} alt="Codex logo" />
        <p>
          Codex is a bot in Discord that reports card sales data from <a href="https://opensea.io">OpenSea</a>.
        </p>
        <p>
          Codex listens for live sales and posts them to the <a href="https://discord.gg/rV3SKTJeKk"><FontAwesomeIcon icon={faDiscord} /> Parallel Discord</a>, often beating the notifications from OpenSea themselves.
          <br />
          You can see the item sold, from and to who, prices in ΞETH and $USD.
        </p>
        <ImageList>
          {codex_sale}
          {codex_testimonial_2}
          {codex_testimonial}
        </ImageList>
        <p>
          Check it out for yourself in the <a href="https://discord.gg/rV3SKTJeKk"><FontAwesomeIcon icon={faDiscord} /> Parallel Discord</a>.
        </p>
      </PageContent>
    </>
  )
}

export default DiscordCodexPage;
