    import mongoose from "mongoose";

    const menuitemSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        taste:{
            type:String,
            enum:["sweet","spicy","sour"],  
            default:"spicy"
        },
        is_drink:{
            type:Boolean,
            default:false
        },
        ingredients:{
            type:[String],
            default:null
        },
        num_sales:{
            type:Number,
            default:0
        }
    });
    const MenuItem= mongoose.model('MenuItem',menuitemSchema);
    export default MenuItem;