const db = require("../config/db")
const { ObjectId } = require('mongodb')

class Analytics {
    static collection() {
        return db.collection('analytics')
    }

    static async createAnalytics(userId, data) {
        const analyticsCollection = this.collection()
        const errors = []

        if (!data.currentWeight) {
            errors.push("Weight is required")
        }

        if (!data.duration) {
            errors.push("Duration is required")
        }

        if (!data.intensity) {
            errors.push("Intensity is required")
        }

        if (errors.length > 0) {
            return { errors }
        }

        const result = await analyticsCollection.insertOne({
            ...data,
            userId: new ObjectId(userId),
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const createdAnalytics = await analyticsCollection.findOne({ _id: result.insertedId })
        return createdAnalytics
    }

    static async findAll(userId) {
        const analyticsCollection = this.collection()
        const data = await analyticsCollection.find({ userId: new ObjectId(userId) }).toArray()
        return data
    }
}

module.exports = Analytics