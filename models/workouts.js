const db = require("../config/db");
const { ObjectId } = require('mongodb')

class Workouts {
    static collection() {
        return db.collection('workouts')
    }

    static async findAll(queryParams) {
        const workoutCollection = this.collection()
        let query = {}
        if (queryParams) {
            query = { ...queryParams }
        }
        const data = await workoutCollection.find(query).toArray()
        return data
    }

    static async findById(workoutId) {
        const workoutCollection = this.collection()
        const workout = await workoutCollection.findOne({ _id: new ObjectId(workoutId) })
        return workout
    }
}

module.exports = Workouts;