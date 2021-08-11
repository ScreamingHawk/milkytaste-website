import './App.css';
import { Web3Provider } from './context/Web3Context';
import Routing from './Routing';



const App = () => {
  return (
    <div className="App">
      <Web3Provider>
        <Routing />
      </Web3Provider>
    </div>
  );
}

export default App;
