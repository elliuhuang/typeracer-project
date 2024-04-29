import mongoose, { Document, Schema } from 'mongoose';

type User = {
    username: string;
    password: string;
    words: number;
    time: number;
}

type UserModel = User & Document;

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wpm: { type: [Number], required: false }, 
    mistakes: { type: [Number], required: false }
});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;