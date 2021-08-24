import './App.css';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import AppInsights from './components/AppInsights/AppInsightsQueries';
import AppInsightsCustomQueries from './components/AppInsights/AppInsightsCustomQuery';
import Error from './components/Error/Error';
import NavigationBar from './components/Navbar/NavigationBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
        <Switch>
          <Route exact path={["/","/home"]}>
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/appinsights-queries">
            <AppInsights/>
          </Route>
          <Route exact path="/appinsights-custom-queries">
            <AppInsightsCustomQueries/>
          </Route>
          <Route path="*">
            <Error/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
