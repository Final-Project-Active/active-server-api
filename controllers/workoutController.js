const Workout = require("../models/workouts");

const getWorkouts = async (req, res) => {
    const queryParams = req.query
    const workouts = await Workout.findAll(queryParams)
    return res.status(200).json(workouts)
}

const getWorkoutById = async (req, res) => {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId)
    return res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkoutById
}