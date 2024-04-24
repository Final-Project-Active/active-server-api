const Analytics = require("../models/analytics");

const createAnalytics = async (req, res) => {
    const userId = req.user._id
    const { currentWeight, duration, intensity } = req.body
    const data = await Analytics.createAnalytics(userId, { currentWeight, duration, intensity })
    if (data.errors) {
        return res.status(400).json({ errors: data.errors })
    }
    return res.status(201).json({ ...data, userId })
}

const getAnalytics = async (req, res) => {
    const userId = req.user._id
    const analytics = await Analytics.findAll(userId)
    if (analytics) {
        return res.status(200).json(analytics)
    }
}

module.exports = {
    createAnalytics,
    getAnalytics
}