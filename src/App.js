import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import DiscordBotPage from './pages/DiscordBotPage';
import ContactMePage from './pages/ContactMePage';
import DiscordCosmosPage from './pages/DiscordCosmosPage';
import DiscordCodexPage from './pages/DiscordCodexPage';
import MintingPage from './pages/MintingPage';
import ArchitecturePage from './pages/ArchitecturePage';
import DiscordPunksPage from './pages/DiscordPunksPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/discord/cosmos">
            <DiscordCosmosPage />
          </Route>
          <Route path="/discord/punks">
            <DiscordPunksPage />
          </Route>
          <Route path="/discord/codex">
            <DiscordCodexPage />
          </Route>
          <Route path="/discord">
            <DiscordBotPage />
          </Route>
          <Route path="/minting">
            <MintingPage />
          </Route>
          <Route path="/architecture">
            <ArchitecturePage />
          </Route>
          <Route path="/contact">
            <ContactMePage />
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
