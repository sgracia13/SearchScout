import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';
import PlayerList from './components/PlayerList';
import logo from './binoc.png'


class App extends Component {
  render(){
    return(
      <Router >
      <div className='container'>
      
            <nav className='navabar navbar-expand-lg navbar-light bg-light'>
          <a className ='navbar-brand' href='https://codingthesmartway.com' target='_blank'>
        <img src={logo} width ='30' height='30' alt ='#' />
      </a>
      
      <Link to='/' className = 'nav-brand title'>Baseball Scout</Link>

      
      
      <div className='nav-collapse'>
        
        <ul className =' navbar-nav mr-auto'>
          
          <li className='navbar-item'>
          <Link to='/' className='nav-link'>PlayerList</Link>
          </li>
          
          <li className='navbar-item'>
          <Link to='/create' className='nav-link'>Create Player</Link>
          </li>
        
        </ul>
      
      </div>

      </nav>



      <Route path='/' exact component={PlayerList}  />
      <Route path='/edit/:id' component={EditPlayer} />
      <Route path='/create' component={CreatePlayer} />
      </div>
      </Router>
    )
  }
}

export default App;
