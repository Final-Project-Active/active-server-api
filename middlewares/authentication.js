const User = require("../models/user");
const {verify} = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        const {authorization} = req.headers;
        if(!authorization) {
            throw {name: "Unauthenticated"}
        }
        const [type, token] = authorization.split(" ")
        if(type !== "Bearer") {
            throw {name: "Unauthenticated"}
        }
        const payload = verify(token)
        const user = await User.findById(payload._id)
        if(!user) {
            throw {name: "Unauthenticated"}
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        if(error.name === "Unauthenticated") {
            return res.status(403).json({message: "You are not authorized"})
        }
        next(error)
    }
}

module.exports = authentication;
