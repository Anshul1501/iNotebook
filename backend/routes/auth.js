const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', (req, res) => {

    //create a user using: POST "/api/auth". Doesn't require auth 
    console.log(req.body);

    const newUser = new User(req.body);
    newUser.save();
    res.send(req.body);
})

module.exports = router