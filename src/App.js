import './App.css';
import Body from './components/body';
import Navbar from './components/navbar';
import {BrowserRouter} from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import { SocketProvider } from './context/socket';

function App() {
  return (
    <>
    <SocketProvider>
      <BrowserRouter>
        <Navbar/>
        {/* <Body /> */}
      </BrowserRouter>
    </SocketProvider>
    </>
  );
}

export default App;