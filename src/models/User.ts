import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  fullname: string;
  posts: number;
  refresh_token: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  posts: { type: Number, default: 0 },
  refresh_token: { type: String, required: false, },
});

export default mongoose.model<IUser>('User', UserSchema);