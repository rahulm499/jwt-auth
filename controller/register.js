const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
router
.get('/',(req, res)=>{
    res.json({message: "Send User Registration Page"});
})
.post('/', async (req, res)=>{
    //IMPLEMENT STORING USER DATA
    const hash = await bcrypt.hash(req.body.password, process.env.HASH_KEY);
    if(await User.findOne({username: req.body.username})){
        res.status(400);
        return res.json({message: "Username ALready Taken"})
    }
    if(!req.body.username || !req.body.password || !req.body.college || !req.body.name || !req.body.year){
        res.status(400);
        return res.json({message: "Please enter the required fields"})
    }
    await User.create({username: req.body.username, password: hash, name: req.body.name, college: req.body.college, year: req.body.year})
    req.body.password = hash;
    res.json(req.body);
})

module.exports = router;