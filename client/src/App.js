import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';
import PlayerList from './components/PlayerList';
import Home from './components/Home'

//This is chatkit as well

import logo from './binoc.png'
import ChatMessage from './components/ChatMessage';
import Signup from './components/Signup';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:c1df7e63-cec1-41db-a25d-623f20faaf2f",
  key: "cecdc44d-c719-421b-9567-23b820cede63:jtUc5A0OXi+3tpsrQbdF5J8Tda7/DGeoR2iFbLh3Ymo="
})
//To this point



class App extends Component {
  
//this is all for the chatkit component  
  constructor(props) {
    super(props);
    this.state = {
      currentUsername:'',
      currentId:'',
      currentView: 'signup'
    }
    
  }

  
  

createUser = (username) => {
  chatkit.createUser({
      id: username,
      name: username,
  })
  .then((currentUser) => {
      this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
      })
  }).catch((err) => {
           if(err.status === 400) {
          this.setState({
              currentUsername: username,
              currentId: username,
              currentView: 'chatApp'
          })
      } else {
          console.log(err.status);
      }
  });
}

 
changeView = (view)=> {
  this.setState({
      currentView: view
  })
}



//to this point
  
  
render(){
    
  let view ='';

  if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage  changeView={this.changeView}/>
  } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser}/>
  } else if (this.state.currentView === "chatApp") {
      view = <h1>The chatapp will go here</h1>
  }
    
    return(
      
  
<Router >
      <div className='container'>
        <nav className='navabar navbar-expand-lg navbar-light bg-light'>
          <a className ='navbar-brand' href='https://codingthesmartway.com' target='_blank'>
        <img src={logo} width ='30' height='30' alt ='#' />
      </a>
      
   <Link to='/home' className = 'nav-brand title'>Baseball Scout</Link>

      <div className='nav-collapse'>
        <ul className =' navbar-nav mr-auto'>
          <li className='navbar-item'>
          <Link to='/' className='nav-link'>Player Database</Link>
          </li>
          
          <li className='navbar-item'>
          <Link to='/create' className='nav-link'>Create Player</Link>
          </li>

          <li className='navbar-item'>
          <Link to='/chat' className='nav-link'>Chat</Link>
          </li>
        </ul>
      </div>
    </nav>


      <Route path='/home' component={Home} />
      <Route path='/' exact component={PlayerList}  />
      <Route path='/edit/:id' component={EditPlayer} />
      <Route path='/create' component={CreatePlayer} />
      <Route path='/chat' component={ChatMessage}/>

    
      </div>

      <div className="App">{view}</div>


      </Router>
    )
    }}

export default App;
