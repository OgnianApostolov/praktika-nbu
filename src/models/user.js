const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('E-mail is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length <= 6 || value.toLowerCase().includes('password')){
                throw new Error('Password cannot be less than 6 characters, nor \'password\'');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: mongoose.Schema.Types.ObjectId
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isConfirmed: {
       type: Boolean,
       default: false 
    },
    ambulatory_list: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    blacklist: [{
        doctor_id:{
            type: mongoose.Schema.Types.ObjectId
        }
    }]
},{
    timestamps: true
});


//do not show some paramaters in json response
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

//authentication
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user.id.toString() }, 'my_jwt_secret');

    //save the generated token to the DB
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//setup a function 'findByCredentials'
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to log in');
    }

    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;