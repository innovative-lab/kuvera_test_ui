import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router, useHistory } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import FundList from './container/fund-list'
import FundView from './container/fund-view'

class App extends React.Component{

  render(){
    return (
      <Router>
        <Switch>
          <Route 
            exact
            path='/fund/explore'
            // render={() => <FundList />}
            component={FundList}
          />
          <Route 
            exact
            path='/fund/explore/:fundId'
            // render={() => <FundList />}
            component={FundView}
          />
          <Route 
            exact
            path='/'
            render={() => <Redirect to={{ pathname: '/fund/explore' }} />}
          />
        </Switch>
      </Router> 
    );
  }
  
}
      // <div className="App">
      //   <header className="App-header">
      //     <input />
      //     { }
      //     <select>
      //       <option value='volvo'>Volve</option>
      //       <option value='bnw'>Bmw</option>
      //       <option value='nissan'>Nissan</option>
      //     </select>
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div></div>

export default App;
