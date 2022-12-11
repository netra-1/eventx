import './App.css';
import Body from './components/body';
import Navbar from './components/navbar';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      {/* <Body /> */}
    </BrowserRouter>
    </>
  );
}

export default App;