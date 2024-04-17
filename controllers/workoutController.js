const Workout = require("../models/workouts");

const getWorkouts = async (req, res) => {
    try {
        const queryParams = req.query
        const workouts = await Workout.findAll(queryParams)
        if (workouts && workouts.length > 0) {
            return res.status(200).json(workouts)
        } else {
            return res.status(404).json({ error: "Data not found" })
        }
    } catch (error) {
        console.error("Error fetching data:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getWorkoutById = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const workout = await Workout.findById(workoutId)
        if (workout) {
            return res.status(200).json(workout)
        } else {
            return res.status(404).json({ error: "Data not found" })
        }
    } catch (error) {
        console.error("Error fetching data:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    getWorkouts,
    getWorkoutById
}