import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Header from '../components/Header';
import PageContent from '../components/PageContent';

import testimonial_1 from '../images/general_testimonial_1.png';
import testimonial_3 from '../images/general_testimonial_3.png';
import testimonial_4 from '../images/general_testimonial_4.png';
import ImageList from '../components/ImageList';

const ContactMePage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Contact Me</h1>
        <p>
          <a href="https://discordapp.com/users/172630139878768640"><FontAwesomeIcon icon={faDiscord} size="xl" /> DM on Discord</a>
        </p>
        <p>
          <a href="https://twitter.com/MilkyTasteEth"><FontAwesomeIcon icon={faTwitter} size="xl" /> Tweet to me on Twitter</a>
        </p>
        <p>
          <a href="mailto:michael@standen.link?subject=MilkyTaste Contact"><FontAwesomeIcon icon={faEnvelope} size="xl" /> Send an Email</a>
        </p>
        <p>
          <a href="https://github.com/ScreamingHawk"><FontAwesomeIcon icon={faGithub} size="xl" /> Check out GitHub</a>
        </p>
        <p>
          <a href="https://michael.standen.link"><FontAwesomeIcon icon={faLinkedin} size="xl" /> Stalk on LinkedIn</a>
        </p>
        <ImageList>
          {testimonial_1}
          {testimonial_3}
          {testimonial_4}
        </ImageList>
      </PageContent>
    </>
  )
}

export default ContactMePage;
