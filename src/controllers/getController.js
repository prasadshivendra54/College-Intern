const mongoose = require('mongoose')
const collegeModel = require('../models/CollegeModel')
const internModel = require('../models/InternModel')

const collegeDetail = async (req, res) =>{
    try {
        let collegeName = req.query.collegeName
        let collegeData = await collegeModel.findOne({name : collegeName}).select({ _id : 0, name : 1, fullName : 1, logoLink : 1})

        const collegeId = await collegeModel.findOne({name : collegeName}).select({_id : 1})
        if(!collegeId) return res.status(404).json({status : false, message : 'College Not Found'})

        let interns = await internModel.find({collegeId : collegeId}).select({_id : 1, name : 1, email : 1, mobile : 1})

        const collegeObject = collegeData.toObject()
        if(interns.length == 0){
            return res.status(404).json({status : false, message : 'No Intern'})
        }else {
            collegeObject.interns = interns
        }

        return res.status(200).json({status : true, data : collegeObject})
    } catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}

module.exports = { collegeDetail }
