const db = require('../config/db');
const validator = require("validator");
const { hash, compare } = require('../helpers/bcrypt');
const { ObjectId } = require('mongodb');
const { sign } = require('../helpers/jwt');

class User {
  static collection() {
    return db.collection('users');
  }

  static async findById(_id) {
    const userCollection = this.collection()
    const data = await userCollection.findOne({
      _id: new ObjectId(_id)
    });
    return data;
  }

  static async register(newUser) {
    const userCollection = this.collection()
    const errors = []

    const isValidEmail = validator.isEmail(newUser.email)
    if (!isValidEmail) {
      errors.push("Invalid email format")
    } else {
      const isUniqueEmail = await userCollection.findOne({ email: newUser.email })
      if (isUniqueEmail) {
        errors.push("Email is already registered")
      }
    }
    if (!newUser.username) {
      errors.push("Username is required")
    } else {
      const isUniqueUsername = await userCollection.findOne({ username: newUser.username })
      if (isUniqueUsername) {
        errors.push("Username is already registered")
      }
    }
    const isValidPassword = validator.isLength(newUser.password, { min: 5 })
    if (!isValidPassword) {
      errors.push("Password is too short")
    }
    if (!newUser.age) {
      errors.push("Age is required")
    }
    if (!newUser.weight) {
      errors.push("Weight is required")
    }
    if (!newUser.height) {
      errors.push("Height is required")
    }
    if (!newUser.gender) {
      errors.push("Gender is required")
    }
    if (!newUser.goal) {
      errors.push("Goal is required")
    }
    if (!newUser.physicalActivity) {
      errors.push("Physical Activity is required")
    }

    if (errors.length > 0) {
      return { errors }
    }

    const result = await userCollection.insertOne({
      ...newUser,
      password: hash(newUser.password),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const createdUser = await this.findById(result.insertedId)
    return {
      user: createdUser
    }
  }

  static async login(credentials) {
    const userCollection = this.collection()
    const { email, password } = credentials;

    const user = await userCollection.findOne({ email });

    if (!user) {
      return { error: "User not found" }
    }

    const passwordMatch = compare(password, user.password)
    if (!passwordMatch) {
      return { error: "Invalid password!" }
    }

    const userIdString = user._id.toString()
    const accessToken = sign({ _id: userIdString })
    return { accessToken }
  }
}

module.exports = User;