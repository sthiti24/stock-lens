import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Summary from './components/Summary';
import Details from './components/Details';
function App() {

  
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' exact element = {<Summary />}/>
          <Route path={`/details/:symbol`} element = {<Details />}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

