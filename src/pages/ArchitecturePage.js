import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PageContent from '../components/PageContent';

const ArchitecturePage = () => {
  return (
    <>
      <Header />
      <PageContent>
        <h1>Software Architecture</h1>
        <p>
          MilkyTaste has corporate experience designing and implementing complex systems for industry leaders.
          <br />
          These services can be available for you to help guide the development of your project.
        </p>
        <p>
          Developing on the blockchain can be very different from traditional web and application development.
          <br />
          Feel free to <Link to="/contact">contact me</Link> for guidance on how you can structure your project.
        </p>
      </PageContent>
    </>
  )
}

export default ArchitecturePage;
