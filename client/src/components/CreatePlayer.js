import React, {Component} from 'react';
import axios from 'axios'

export default class CreatePlayer extends Component{
   constructor(props) {
       super(props);

       this.state={
           player_name:'',
           player_position:'',
           player_notes:'',
           player_evaluated:false
           
       }
   }

   onChangePlayerName = (e) =>
   this.setState({
       player_name:e.target.value
   })

   onChangePlayerPosition = (e) =>
   this.setState({
       player_position:e.target.value
   })

   onChangePlayerNotes = (e) =>
   this.setState({
       player_notes:e.target.value
   })

   onSubmit = (e) => {
    
    e.preventDefault(); 

    console.log(`player submitted:`);
    console.log(`player name: ${this.state.player_name}`)
    console.log(`player position: ${this.state.player_position}`)
    console.log(`player notes: ${this.state.player_notes}`)
    console.log(`player evaluated: ${this.state.player_evaluated}`)

    const newPlayer = {
        player_name: this.state.player_name,
        player_position:this.state.player_position,
        player_notes:this.state.player_notes,
        player_evaluated:this.state.player_evaluated
    }

    axios.post('http://localhost:4000/player/add', newPlayer)
        .then(res => console.log(res.data))
    
    this.setState({
            player_name:'',
            player_position:'',
           player_notes:'',
           player_evaluated:false
           
    })
   }
   
   
    render() {
       return(
           <div style={{marginTop: 10}}>
               <h3>Create New Player</h3>
               
               <form onSubmit={this.onSubmit}>
               <div className='form-group'>
               <label>Player Name:</label>
               <input type='text' 
                      className='form-control'
                      value={this.state.player_name}
                      onChange={this.onChangePlayerName}
                      />
               </div>

               <div className='form-group'>
               <label>Player Position:</label>
               <input type='text' 
                      className='form-control'
                      value={this.state.player_position}
                      onChange={this.onChangePlayerPosition}
                      />
               </div>

               <div className='form-group'>
               <label>Player Notes:</label>
               <input type='text' 
                      className='form-control'
                      value={this.state.player_notes}
                      onChange={this.onChangePlayerNotes}
                      />
               </div>

               
               
               
               <div className='form-group'>
               <input type='submit' value='Create Player File' className='btn btn-primary'/>
                   </div>
               </form>
               </div>
       )
   }

}