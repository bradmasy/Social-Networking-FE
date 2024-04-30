import { BrowserRouter } from "react-router-dom";
import { ApiServiceProvider } from '../contexts/ApiServiceContext';
import { Routes } from './Routes';
import './App.scss';

function App() {

  return (
    <div className="App">
      <ApiServiceProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApiServiceProvider>
    </div>
  );
}

export default App;
