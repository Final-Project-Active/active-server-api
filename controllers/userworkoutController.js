const UserWorkouts = require("../models/userworkouts");

const addUserWorkout = async (req, res) => {
    try {
        const userId = req.user._id
        const { workoutId } = req.params

        await UserWorkouts.addUserWorkout(userId, workoutId)
        return res.status(201).json({ message: "Workout successfully added" })
    } catch (error) {
        if (error.message === "Workout not found") {
            return res.status(404).json({ error: "Data not found" })
        } else if (error.message === "The workout is already added") {
            return res.status(401).json({ error: "The workout is already added" })
        }
    }
}

const getUserWorkout = async (req, res) => {
    const userId = req.user._id
    const result = await UserWorkouts.getUserWorkout(userId)
    return res.status(200).json(result)
}

const updateUserWorkout = async (req, res) => {
    try {
        const userId = req.user._id
        const { workoutId } = req.params

        const result = await UserWorkouts.updateUserWorkout(userId, workoutId)

        if (result) {
            return res.status(200).json({ message: "Workout has been marked as completed" })
        } else {
            return res.status(400).json({ error: "The workout is already marked as completed" })
        }
    } catch (error) {
        console.error("Error adding to the userworkouts collection:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    addUserWorkout,
    getUserWorkout,
    updateUserWorkout
}