const User = require("../models/user");

const registerUser = async (req, res) => {
    try {
        const user = await User.register(req.body)
        if(user) {
            return res.status(201).json(user)
        } else {
            return res.status(400).json({error: user.error})
        }
    } catch (error) {
        console.log("Error registering user:", error)
        res.status(500).json({error: "Internal server error"})
    }
}

    const loginUser = async (req, res) => {
        try {
            const {email, password} = req.body;
            const result = await User.login({email, password})

            if(result.accessToken) {
                res.status(200).json(result)
            } else {
                res.status(401).json({error: result.error})
            }
        } catch (error) {
            console.error("Error logging in:", error)
            res.status(500).json({error: "Internal server error"})
        }
    };

module.exports = {
    registerUser,
    loginUser
}