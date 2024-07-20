import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['job-seeker', 'employer'], required: true},
});

userSchema.pre('validate', function(next) {
    let self = this;
    if (self.isNew || self.isModified('password')) {
        bcrypt.hash(self.password, 10)
        .then((password) => {
            this.password = password;
            return next();
        })
        .catch (err => {
            return next(err);
        })
    }
})

const User = mongoose.model('User', userSchema);

export default User;

