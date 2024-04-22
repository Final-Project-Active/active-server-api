const Analytics = require("../models/analytics");

const createAnalytics = async (req, res) => {
    try {
        const userId = req.user._id
        const { currentWeight, duration, intensity } = req.body
        const data = await Analytics.createAnalytics(userId, { currentWeight, duration, intensity })
        if (data) {
            return res.status(201).json({ ...data, userId })
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
        if (analytics) {
            return res.status(200).json(analytics)
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