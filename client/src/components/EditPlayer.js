import React, {Component} from 'react';
import axios from 'axios'; 

export default class EditPlayer extends Component{

    constructor(props) {
        super(props);

        this.state = {
            player_name:'',
            player_position:'',
            player_notes:'',
            player_evaluated: false
        }
    }



    componentDidMount() {
        axios.get('http://localhost:4000/player/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                player_name:response.data.player_name,
                player_position:response.data.player_position,
                player_notes:response.data.player_notes,
                player_evaluated:response.data.player_evaluated
            })
            
        })

        .catch(function(error) {
            console.log(error)
        })
    }





  //Actions   
    onChangePlayerName = (e) =>{
        this.setState({
        player_name:e.target.value
        })
    }

    onChangePlayerPosition =(e) => {
        this.setState({
            player_position:e.target.value
        })
    }


    onChangePlayerNotes = (e) => {
        this.setState({
            player_notes:e.target.value
        })

    }

  onChangePlayerEvaluated = (e) =>{
      this.setState({
          player_evaluated:!this.state.player_evaluated
      })
  } 
  
  onSubmit = (e) =>{
    e.preventDefault();
    const obj ={
        player_name:this.state.player_name,
        player_position: this.state.player_position,
        player_notes:this.state.player_notes,
        player_evaluated:this.state.player_evaluated
    }
    axios.post('http://localhost:4000/player/update/' + this.props.match.params.id, obj)
    .then(res => console.log(res.data));

    this.props.history.push('/');
  }

    

   render() {
       return(
           <div>
               <h3>Update Player File</h3>
               <form onSubmit={this.onSubmit}>
               <div className='form-group'>
               
            <label>Name: </label>
               <input type ='text'
                      className='form-control'
                      value= {this.state.player_name}
                      onChange={this.onChangePlayerName}
                      />
            <label>Position: </label>
               <input type ='text'
                      className='form-control'
                      value= {this.state.player_position}
                      onChange={this.onChangePlayerPosition}
                      />      

            <label>Notes: </label>
               <input type ='text'
                      className='form-control'
                      value= {this.state.player_notes}
                      onChange={this.onChangePlayerNotes}
                      />
                    

             <div className="form-check">
             <input type='checkbox'
                    className='form-check-input'
                    id='completedCheckbox'
                    name='completedCheckbox'
                    onChange={this.onChangePlayerEvaluated}

                    checked={this.state.player_evaluated}
                    value={this.state.player_evaluated}
                    />
                <label className='form-check-label' htmlFor='completedCheckbox'>
                Evaluated
                </label>   

             </div>
             <br/>

             <div className='form-group'>
             <input type='submit' value='Update Player' className='btn btn-primary'/>
             </div>       
                    
                    </div>
               </form>
               </div>
       )
   }

}