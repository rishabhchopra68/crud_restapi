const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req,res) => {    // ^/$ -> start and end with slash 
    res.sendFile(path.join(__dirname,'..', 'views','index.html'));
})

module.exports = router;