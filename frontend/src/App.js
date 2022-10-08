import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListarComponente from './components/ListarComponente';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CrearComponente from './components/CrearComponente';
import VerComponente from './components/VerComponente';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListarComponente}></Route>
                          <Route path = "/Datacreditos" component = {ListarComponente}></Route>
                          <Route path = "/adicionar-Datacredito/:id" component = {CrearComponente}></Route>
                          <Route path = "/ver-Datacredito/:id" component = {VerComponente}></Route>                          
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
