const mongoose = require('mongoose')
const collegeModel = require('../models/CollegeModel')
const internModel = require('../models/InternModel')


const createCollege = async (req, res) =>{
    try {
        let collegeData = req.body
        let createdCollege = await collegeModel.create(collegeData)
        const data = await collegeModel.findOne(createdCollege).select({_id : 0, name : 1, fullName : 1, logoLink : 1, isDeleted : 1})
        return res.status(201).json({status : true, data : data})
    } catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}



const createIntern = async (req, res) =>{
    try {
        let {name, email, mobile} = req.body
        let collegeName = req.body.collegeName
        let collegeId = await collegeModel.findOne({name : collegeName}).select({_id : 1})
        let createIntern = await internModel.create({name, email, mobile, collegeId : collegeId._id})
        let data = await internModel.findOne(createIntern).select({_id : 0, name : 1, email : 1, mobile : 1, collegeId : 1, isDeleted : 1})
        return res.status(201).json({status : true, data : data})
    } catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}

module.exports = {
    createCollege,
    createIntern
}