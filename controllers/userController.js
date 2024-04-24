const User = require("../models/user");

const registerUser = async (req, res) => {
    const { name, username, email, password, imageUrl, age, weight, gender, height, goal, physicalActivity } = req.body
    const user = await User.register({ name, username, email, password, imageUrl, age, weight, gender, height, goal, physicalActivity })
    if (user && !user.errors) {
        return res.status(201).json(user)
    } else {
        return res.status(400).json({ error: user.errors })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await User.login({ email, password })

    if (result.accessToken) {
        res.status(200).json(result)
    } else {
        res.status(401).json({ error: result.error })
    }
};

const findById = async (req, res) => {
    const id = req.params.userId ? req.params.userId : req.user._id
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    return res.status(200).json(user)
}

module.exports = {
    registerUser,
    loginUser,
    findById
}