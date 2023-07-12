import express from'express'
import {login,signup} from '../controllers/Auth.js'
import {getAllUsers , updateProfile} from '../controllers/Users.js'
import auth from '../middleware/Auth.js'
const router= express.Router();
router.post('/login' , login)
router.post('/signup', signup)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',auth,updateProfile)
export default router