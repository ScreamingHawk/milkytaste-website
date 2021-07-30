import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import DiscordBotPage from './pages/DiscordBotPage';
import SayThanksPage from './pages/SayThanksPage';
import ContactMePage from './pages/ContactMePage';
import DiscordCosmosPage from './pages/DiscordCosmosPage';
import DiscordCodexPage from './pages/DiscordCodexPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/discord/cosmos">
            <DiscordCosmosPage />
          </Route>
          <Route path="/discord/codex">
            <DiscordCodexPage />
          </Route>
          <Route path="/discord">
            <DiscordBotPage />
          </Route>
          <Route path="/contact">
            <ContactMePage />
          </Route>
          <Route path="/thanks">
            <SayThanksPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
