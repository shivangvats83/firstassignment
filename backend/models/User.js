
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false, 
  },
  picture: {
    type: String,
    default: ""
  },
  provider: {
    type: String,
    enum: ['local', 'google'], 
    default: 'local'
  }
});


const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UserModel;
