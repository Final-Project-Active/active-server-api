const { ObjectId } = require('mongodb');
const db = require('../config/db');

class Post {
  static collection() {
    return db.collection('posts');
  }

  static async findAll(page, limit) {
    const postCollection = this.collection();
    const data = await postCollection
      .find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .toArray();
    return data;
  }

  static async findById(_id) {
    const postCollection = this.collection();
    const data = await postCollection.findOne({
      _id: new ObjectId(_id)
    });
    return data;
  }

  static async create(data) {
    const postCollection = this.collection();
    const result = await postCollection.insertOne(data);
    return result;
  }

  static async addComment(data) {
    const postCollection = this.collection();
    const result = await postCollection.updateOne(
      { _id: new ObjectId(data.postId) },
      {
        $push: {
          comments: {
            comment: data.comment,
            userId: data.userId
          }
        }
      }
    );
    return result;
  }

  static async addLike(data) {
    const postCollection = this.collection();
    const result = await postCollection.updateOne(
      { _id: new ObjectId(data.postId) },
      { $push: { likes: data.userId } }
    );
    return result;
  }

  static async isLiked(data) {
    const postCollection = this.collection();
    const result = await postCollection.findOne({
      _id: new ObjectId(data.postId)
    });

    if (result) {
      const likes = result.likes.map((id) => {
        return id.toString();
      });
      return likes.includes(data.userId.toString())
    }
    return false
  }

  static async deleteById(_id) {
    const postCollection = this.collection();
    const result = await postCollection.deleteOne({
      _id: new ObjectId(_id)
    });
    return result;
  }
}

module.exports = Post