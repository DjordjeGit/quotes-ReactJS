import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import AllQuotes from './pages/AllQuotes';
import AddQuotes from './pages/AddQuote';
import QuoteDetail from './quotes/QuoteDetail';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <div className="overlay"></div>
      <Switch>
        <Route exact path="/allquotes">
          <AllQuotes />
        </Route>
        <Route path="/addquotes">
          <AddQuotes />
        </Route>
        <Route path="/quotedetail/:paramsId">
          <QuoteDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
