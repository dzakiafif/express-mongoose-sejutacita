import mongoose from 'mongoose';
import * as encryption from '../utils/Encryption';

const { Schema } = mongoose;

const userSchema = Schema({
  fullname: String,
  username: String,
  password: String,
  role: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  try {
    this.password = encryption.generatedHash(this.password);
  } catch (err) {
    console.log(err);
  }

  return next();
});

const Users = mongoose.model('users', userSchema);

export default Users;
