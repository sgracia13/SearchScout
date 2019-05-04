const express = require ('express')
const app = express();
const bodyParser = require ('body-parser')
const cors = require('cors');
const playerRoutes=express.Router()
const mongoose = require('mongoose');
const PORT = 4000;


let Player = require('./player.model');



app.use(cors());
app.use(bodyParser.json());

//used to connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/players', {useNewUrlParser:true})
const connection = mongoose.connection;





connection.once('open', function() {
    console.log('MongoDB database connection established successfully')
} )


playerRoutes.route('/').get(function(req,res){
    Player.find(function(err,players){
        if(err) {
            console.log(err);
        }else{
            res.json(players);
        }
    })
})

playerRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Player.findById(id, function(err, player){
        res.json(player);
    })
})

playerRoutes.route('/add').post(function(req,res){
    let player = new Player(req.body);
   player.save()
   .then(player => {
       res.status(200).json({'player': "player added successfully"})
   })
   .catch(err => {
       res.status(400).send('adding new player failed')
   })
})

playerRoutes.route('/update/:id').post(function (req,res){
    Player.findById(req.params.id), function(err, player){
        if(!player)
        res.status(404).send('data is not found')
        else
            player.player_name = req.body.player_name
            player.player_position = req.body.player_position
            player.player_notes = req.body.player_notes
        player.save().then(player => {
            res.json('player updated')
        })
        .catch(err => {
            res.status(400).send('Update not possible')
        })
        }

})


app.use('/player',playerRoutes);




app.listen(PORT, function() {
    console.log('running server on PORT:' + PORT)
});
