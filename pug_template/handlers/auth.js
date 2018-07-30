const db = require("../models");
const bcrypt = require("bcrypt");

exports.comparePassword = async function (candidatePassword, userPassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, userPassword);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

exports.signin = async function (req, res, next) {
    
    let { username, password } = req.body;
    
    try {
        let user = await db.findUser(username);
        let isMatch = comparePassword(password, user.password);

        if (isMatch) {
            return res
                .status(200)
                .render('welcome', { 
                    name: username
                });
        } else {
            return res
                .status(400)
                .render('signin', { 
                    name: username,
                    errormsg: "Invalid Username/Password."
                });
        }
    } catch (err) {
        return res
            .status(400)
            .render('signin', { 
                name: username,
                errormsg: "Invalid Username/Password."
            });
    }
}