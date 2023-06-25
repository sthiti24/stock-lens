import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Summary from './components/Summary';
import Details from './components/Details';
function App() {

  
  return (
    <div className="App" style={{width:"100%",position:"relative"}}>
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

