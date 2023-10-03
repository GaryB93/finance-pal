import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  dbName: 'finance-pal'
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log(err);
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: { type: String, required: true},
  securityQuestion: String,
  securityAnswer: String,
});

const User = mongoose.model('user', userSchema);

export default User;