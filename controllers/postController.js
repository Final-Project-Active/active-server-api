const Post = require('../models/post');

const getPost = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const posts = await Post.findAll(page, Number(limit))
    if (posts && posts.length > 0) {
      return res.status(200).json(posts)
    } else {
      return res.status(404).json({ error: "Data not found" })
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const addPost = async (req, res) => {
  try {
    const userId = req.user._id
    const { thumbnail, caption } = req.body
    const likes = []
    const comments = []
    const createdAt = new Date()
    const data = await Post.create({ userId, thumbnail, caption, likes, comments, createdAt })

    if (data) {
      return res.status(201).json({ id: data.insertedId })
    } else {
      return res.status(400).json({ error: data.error })
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const getPostById = async (req, res) => {
  try {

  } catch (error) {
    console.error("Error fetching data:", error)
    return res.status(500).json({ error: "Internal server error" })
  }

}

const addLike = async (req, res) => {
  try {
    const userId = req.user._id
    const postId = req.body.postId

    const isLiked = await Post.isLiked({ userId, postId })
    if (isLiked) {
      return res.status(201).json({ status: true })
    }

    const data = await Post.addLike({ userId, postId })
    if (data) {
      return res.status(201).json({ status: data.acknowledged })
    } else {
      return res.status(400).json({ error: data.error })
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const addComment = async (req, res) => {

}

module.exports = {
  getPost,
  getPostById,
  addPost,
  addLike,
  addComment
}