const Analytics = require("../models/analytics");

const createAnalytics = async (req, res) => {
    try {
        const userId = req.user._id
        const { currentWeight, duration, intensity } = req.body
        const data = await Analytics.createAnalytics(userId, { currentWeight, duration, intensity })
        if (data) {
            return res.status(201).json({ ...data, userId })
        } else {
            return res.status(400).json({ error: data.error })
        }
    } catch (error) {
        console.error("Error creating analytics:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getAnalytics = async (req, res) => {
    try {
        const userId = req.user._id
        const analytics = await Analytics.findAll(userId)
        if (analytics.length > 0) {
            return res.status(200).json(analytics)
        } else {
            return res.status(404).json({ error: "Data not found" })
        }
    } catch (error) {
        console.error("Error fetching analytics:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    createAnalytics,
    getAnalytics
}