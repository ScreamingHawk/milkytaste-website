import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Header from '../components/Header';
import PageContent from '../components/PageContent';

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
          <a href="mailto:michael@standen.link?subject=MilkyTaste Contact"><FontAwesomeIcon icon={faEnvelope} size="xl" /> Send an Email</a>
        </p>
        <p>
          <a href="https://github.com/ScreamingHawk"><FontAwesomeIcon icon={faGithub} size="xl" /> Check out GitHub</a>
        </p>
        <p>
          <a href="https://michael.standen.link"><FontAwesomeIcon icon={faLinkedin} size="xl" /> Stalk on LinkedIn</a>
        </p>
      </PageContent>
    </>
  )
}

export default ContactMePage;
