const db = require("../config/db");
const Workout = require("./workouts")
const { ObjectId } = require('mongodb')

class UserWorkouts {
    static collection() {
        return db.collection('userworkouts')
    }

    static async addUserWorkout(userId, workoutId) {
        const userWorkoutCollection = this.collection()
        const existingWorkout = await userWorkoutCollection.findOne({ userId: new ObjectId(userId), workoutId: new ObjectId(workoutId) })
        if (existingWorkout) {
            throw new Error("The workout is already added")
        }
        const workout = await Workout.findById(workoutId)

        if (workout) {
            const result = await userWorkoutCollection.insertOne({ userId: new ObjectId(userId), workoutId: new ObjectId(workoutId), completed: false })
            return result
        } else {
            throw new Error("Workout not found")
        }
    }

    static async updateUserWorkout(userId, workoutId) {
        const userWorkoutCollection = this.collection()

        const result = await userWorkoutCollection.updateOne({ userId: new ObjectId(userId), workoutId: new ObjectId(workoutId) }, { $set: { completed: true } })

        if (result.modifiedCount > 0) {
            const updatedUserWorkout = await userWorkoutCollection.findOne({ userId: new ObjectId(userId), workoutId: new ObjectId(workoutId) })
            return updatedUserWorkout
        } else {
            return null
        }
    }
}

module.exports = UserWorkouts;