const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router
.get('/users', (req, res) => {
    User.find({}, (err, users)=>{
        const data =[];
        users.forEach(user => {
            data.push({username: user.username, name: user.name, college: user.college, year: user.year})
        })
        res.json(data);
    })
})
.patch('/update', async (req, res) => {
    User.findOne({username: req.body.username}, async (err, user)=>{
        if(user){
            if(await bcrypt.compare(req.body.password, user.password)){
                if(req.body.name)
                    user.name = req.body.name;
                if(req.body.college)
                    user.college = req.body.college;
                if(req.body.year)
                    user.year = req.body.year;
                user.save();
                return res.status(200).json({message: 'Data changed'})

            }else{
                return res.status(401).json({message: 'Incorrect username or password'});
            }
        }else{
            return res.status(401).json({message: 'Incorrect username or password'});
        }
            
    })
    
})

module.exports = router;