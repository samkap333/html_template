const mongo = require('mongoose');


const Loan= new mongo.Schema({
    
    amount: { type:Number ,require: true},
    period: { type: Number ,require: true},
    interest: { type: Number ,require: true},
    
              
    
    


})



module.exports = mongo.model("Loan",Loan);
