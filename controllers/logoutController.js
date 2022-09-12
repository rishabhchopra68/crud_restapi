const User = require("../model/User");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    //check if no cookie is there i.e. no loggedIn user
    if (!cookies?.jwt) return res.sendStatus(204);  // all well but nothing to send
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    //no user but cookie still there 
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204);
    }

    // now, user and cookie both exist
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
}

module.exports = { handleLogout }