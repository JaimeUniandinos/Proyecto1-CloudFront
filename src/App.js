import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Home } from './components/Home';
import { Contents } from './components/Contents';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Signup } from './components/Signup';
import 'bootswatch/dist/lux/bootstrap.min.css'



function App() {
  
  return (
    <Router>
      <Navbar/>
      <div className='container p-4'>
        <Switch>
          <Route path="/Signup" component={Signup}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Contents" component={Contents}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
