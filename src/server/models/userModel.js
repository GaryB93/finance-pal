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
  username: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true, default: new Date() },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
  incomes: [{
    date: { type: Date, required: true, default: new Date() },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  }],
  expenses: [{
    date: { type: Date, required: true, default: new Date() },
    category: { type: String },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  }],
});

const User = mongoose.model('user', userSchema);

export default User;