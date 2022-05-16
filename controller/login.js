const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router
.post('/', (req, res)=>{
        User.findOne({username: req.body.username},async (err, user)=>{
            if(user){
                if(await bcrypt.compare(req.body.password, user.password)){
                    const payload = {username: user.username, college: user.college}
                    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '1d'});
                    res.setHeader('session-token', token);
                    return res.send();
                }
            }
            return res.status(401).json({message: 'Incorrect username or password'});
            
        })
})
.get('/', (req, res)=>{
        const token = req.headers["session-token"];
        try {
            const data = jwt.verify(token, process.env.PRIVATE_KEY);
            User.findOne({username: data.username}, (err, user)=>{
                res.json({username: user.username, college: user.college});
            })
        } catch (error) {
            res.status(401).json({message: 'Incorrect'});
        }
        
})

module.exports = router;