const mongoose = require('mongoose')

const InternSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    collegeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "College"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true } )

module.exports = mongoose.model('Intern', InternSchema)