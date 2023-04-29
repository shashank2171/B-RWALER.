const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a Name!"],
        unique: [false],
    },
    email:{
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true,"Email Exist"],
    },
    password:{
        type: String,
        required: [true, "Please provide a password!"],
        unique: [false],
    },
    history:[{
        id:{
            type: String,
            required: true,
            unique: [true, "Duplicate!"]
        },
        title:{
            type:String
        },
        author:{
            type:String
        },
        publisher:{
            type:String
        },
        language:{
            type:String
        },
        extension:{
            type:String
        },
        identifier:{
            type:String
        },
        coverurl:{
            type:String
        },
        filesize:{
            type:String
        },
        descr:{
            type:String
        },
        ipfs_cid:{
            type:String
        }
    }],
    wishlist:[{
        id:{
            type: String,
            required: true,
            unique: [true, "Duplicate!"]
        },
        title:{
            type:String
        },
        author:{
            type:String
        },
        publisher:{
            type:String
        },
        language:{
            type:String
        },
        extension:{
            type:String
        },
        identifier:{
            type:String
        },
        coverurl:{
            type:String
        },
        filesize:{
            type:String
        },
        descr:{
            type:String
        },
        ipfs_cid:{
            type:String
        }
    }],
})

const model = mongoose.model("Users", UserSchema);
module.exports = model;
