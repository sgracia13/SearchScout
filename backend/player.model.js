const mongoose = require('mongoose');
const Schema = mongoose.Schema

let Player = new Schema({
    player_name:{
        type:String
    },
    player_position:{
        type:String
    },
    player_notes:{
        type:String
    }
});

module.exports = mongoose.model('Player', Player);