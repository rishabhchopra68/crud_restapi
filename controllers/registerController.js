const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd){
        return res.status(400).json({'message': 'User and password both required !'})    
    }
    // we have both user and pwd now
    // check for duplicate user
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409) // conflict

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10); // encrypt password
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });
        res.status(201).json({'success': `new user ${user} created`})
    }catch(err){
        res.status(500).json({'message': err.message})
    }
}

module.exports = {handleNewUser};