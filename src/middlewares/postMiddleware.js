const mongoose = require('mongoose')
const axios = require('axios')
const collegeModel = require('../models/CollegeModel')
const internModel = require('../models/InternModel')



// To Create/Add College:-
const postCollege = async (req, res, next) =>{
    try {
        let collegeData = req.body

        // Name Validation
        if(!collegeData.name) return res.status(400).json({status : false, message : 'College Name Not Given (REQUIRED) !'})
        let nameFormate = /^[A-Z a-z,.]+$/ // this is for name validation
        if(typeof collegeData.name !== 'string' || !nameFormate.test(collegeData.name)) return res.status(400).json({status : false, message : 'College Name Must Be String Formate'})
        let collegeName = await collegeModel.find({name : collegeData.name})
        if(collegeName.length > 0) return res.status(400).json({status : false, message : 'College Already Exist'})


        // Full Name Validation
        if(!collegeData.fullName) return res.status(400).json({status : false, message : 'College Full Name Not Given (REQUIRED) !'})
        if(typeof collegeData.fullName !== 'string' || !nameFormate.test(collegeData.fullName)) return res.status(400).json({status : false, message : 'College Full Name Must Be String Formate'})
        let collegeFullName = await collegeModel.find({fullName : collegeData.fullName})
        if(collegeFullName.length > 0) return res.status(400).json({status : false, message : 'College Already Exist'})


        // LogoLink Validation
        try {
            await axios.get(collegeData.logoLink)
        } catch (error) {
            return res.status(400).json({status : false, message : error.message})
        }

        next()
    } catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}



// To Create/Add/Apply For Internship (Student):-
const postIntern = async (req, res, next) =>{
    try {
        let internData = req.body

        // Name Validation
        if(!internData.name) return res.status(400).json({status : false, message : 'Student Name Not Given, (REQUIRED) !'})
        let nameFormate = /^[A-Z a-z]+$/ // this is for name validation
        if(typeof internData.name !== 'string' || !nameFormate.test(internData.name)) return res.status(400).json({status : false, message : 'Name Must Be String Formate'})


        // Email Validation
        if(!internData.email) return res.status(400).json({status : false, message : 'Student Email Not Given, (REQUIRED) !'})
        let emailFormat = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // this is for email validation
        if(!emailFormat.test(internData.email)) return res.status(400).json({status : false, message : 'Invalid Email, (Please Enter Currect Email)!'})
        let email = await internModel.find({email : internData.email})
        if(email.length > 0) return res.status(400).json({status : false, message : 'Email Already Exist'})


        // Mobile Number Validation
        if(!internData.mobile) return res.status(400).json({status : false, message : 'Phone Number Not Given, (REQUIRED) !'})
        let numberFormat = /^\d{10}$/ // this is for number validation
        if(!numberFormat.test(internData.mobile)) return res.status(400).json({status : false, message : 'Mobile Number Must Be 10 Digit !'})
        let mobile = await internModel.find({mobile : internData.mobile})
        if(mobile.length > 0) return res.status(400).json({status : false, message : 'Mobile Number Already Exist'})


        // CollegeName Validation
        if(!internData.collegeName) return res.status(400).json({status : false, message : 'CollegeName Not Given, (REQUIRED) !'})
        let collegeName = await collegeModel.findOne({name : internData.collegeName})
        if(!collegeName) return res.status(400).json({status : false, message : 'collegeName Invalid OR Not Exist !'})

        next()
    } catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}

module.exports = {
    postCollege,
    postIntern
}