const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const getController = require('../controllers/getController')
const postMiddleware = require('../middlewares/postMiddleware')


router.post('/functionup/colleges', postMiddleware.postCollege, postController.createCollege)
router.post('/functionup/interns', postMiddleware.postIntern, postController.createIntern)

router.get('/functionup/collegeDetails', getController.collegeDetail)

module.exports = router