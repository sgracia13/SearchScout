import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Player = props => (
    <tr>
        <td className = {props.player.player_evaluted ? 'evaluated' : ''}>{props.player.player_name}</td>
        <td className = {props.player.player_evaluted ? 'evaluated' : ''}>{props.player.player_position}</td>
        <td className = {props.player.player_evaluted ? 'evaluated' : ''}>{props.player.player_notes}</td>

        <td><Link to={'/edit/' + props.player._id}>Edit</Link></td>
    </tr>
)

export default class PlayerList extends Component{

constructor(props){
    super(props);
    this.state = {
        player:[]
}
}

componentDidMount = (e) => {
    axios.get('http://localhost:4000/player/')
    .then(response => {
        this.setState({player: response.data});
    })
    .catch(function(error){
        console.log(error)

    })
}

componentDidUpdate = (e) => {
    axios.get('http://localhost:4000/player/')
    .then(response => {
        this.setState({player: response.data});
    })
    .catch(function(error){
        console.log(error)

    })

}

playerList= () => {
    return this.state.player.map(function(currentPlayer, i)
    {
        return <Player player={currentPlayer} key ={i}/>
    })
}

    render() {
       return(
           <div>
               <h3>Player List</h3>
               <table className="table table-striped" style={{marginTop:20}}>
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Position</th>
                       <th>Performance Notes</th>
                   </tr>
               </thead>
               <tbody>
                   {this.playerList()}
               </tbody>
               </table>
               </div>
       )
   }

}