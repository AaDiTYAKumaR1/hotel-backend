import mongoose from "mongoose";
const mongoURL= "mongodb://localhost:27017/mydatabase"
// const connectMongoose=async()=>{
//   try {
//      await mongoose.connect("mongoURL")
//       console.log(`conneted mongodb succesfully`)
      
//   }catch (error) {
//     console.error("MongoDB connection error:", error);
// }
// };
// const UserSchema=new mongoose.Schema({
    // username:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // password:{
    //     type:String,
    //     required:true
    // },
    // createdAt:{
    //     type:Date,
    //     default:Date.now()
    // }
// });
// export const User=mongoose.model("User",UserSchema);

// export default connectMongoose;

const db=mongoose.connect(mongoURL)
.then( ()=> console.log("database connected successfully"))
.catch( err =>  console.log("error occured in database",err))


export {db};