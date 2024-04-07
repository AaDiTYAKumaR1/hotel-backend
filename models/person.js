import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    moblie:{
        type:Number,
        // required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save',function(next){
    const person =this;
    if(!person.isModified('password')) return next();
    try {
        const salt = bcrypt.genSaltSync(10);
         const hasedPassword =  bcrypt.hashSync(person.password,salt);
         person.password=hasedPassword;
        next();
    } catch (error) {
        return error;
    }
});
personSchema.methods.comparePassword = function(userpass) {
    try {
        const isMatch = bcrypt.compareSync(userpass, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


const Person=mongoose.model('Person',personSchema);
export default Person;