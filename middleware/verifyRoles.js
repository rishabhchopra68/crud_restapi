const verifyRoles = (...allowedRoles) => {  // custom for each activity which is required to be performed
    return (req, res, next) => {
        if(!req?.roles) return new res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        // req obj contains the roles incoming which need to be verified with rolesArray
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;