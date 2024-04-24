const Post = require('../models/post');

const getPost = async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const posts = await Post.findAll(page, Number(limit))
  if (posts)
    return res.status(200).json(posts)
}

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId

    const data = await Post.findById(postId)
    if (!data) {
      return res.status(404).json({ error: "Data not found" })
    } else {
      return res.status(200).json(data)
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }

}

const addPost = async (req, res) => {
  const userId = req.user._id
  const { thumbnail, caption } = req.body

  if (!thumbnail || !caption) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const likes = []
  const comments = []
  const createdAt = new Date()
  const data = await Post.create({ userId, thumbnail, caption, likes, comments, createdAt })
  return res.status(201).json({ id: data.insertedId })
}

const addLike = async (req, res) => {
  const userId = req.user._id
  const postId = req.body.postId

  const isLiked = await Post.isLiked({ userId, postId })
  if (isLiked) {
    return res.status(200).json({ status: true })
  }

  const data = await Post.addLike({ userId, postId })
  return res.status(200).json({ status: data.acknowledged })
}

const removeLike = async (req, res) => {
  const userId = req.user._id
  const postId = req.body.postId

  const data = await Post.removeLike({ userId, postId })
  return res.status(200).json({ status: data.acknowledged })
}

const addComment = async (req, res) => {
  const userId = req.user._id
  const postId = req.body.postId
  const comment = req.body.comment

  const post = await Post.findById(postId)
  if (!post) {
    return res.status(404).json({ error: ['post not found'] })
  }

  const data = await Post.addComment({ userId, postId, comment })

  if (data.error) {
    return res.status(400).json({ error: data.error })
  } else {
    return res.status(201).json({ status: data.acknowledged })
  }
}

const deleteById = async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.user._id

    const post = await Post.findById(postId)
    if (post.userId.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const data = await Post.deleteById(postId)
    return res.status(200).json({ status: data.acknowledged })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  getPost,
  getPostById,
  addPost,
  addLike,
  removeLike,
  addComment,
  deleteById
}