import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
