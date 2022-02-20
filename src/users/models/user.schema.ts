import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'


export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    Role: {
        type: [String],
        default: 'user',
        enum: ['user', 'admin']
    }
},
{toJSON:{
    transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
    }
}})


userSchema.pre('save', async function( next) {
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashed = await bcrypt.hash(this['password'],10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
    
});

export const User = mongoose.model('User', userSchema);
