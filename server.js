import express from 'express'
import path from 'path';
import Person from './models/person.js';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { dirname } from 'path';
import { render } from 'ejs';
import {db} from './database.js';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();
const app= express();
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');
app.use(passport.initialize());
passport.use(new LocalStrategy( async (USERNAME, password, done) => {
    try {
        console.log("received credentials", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });

        if (!user) {
            return done(null, false, { message: 'Invalid username' });
        }

        const userPass = await user.comparePassword(password);  
        if (userPass) {
            done(null, user);
        } else {
            done(null, false, { message: 'Invalid password' });
        }
        
    } catch (error) {
        done(error);
    }
}));


    import userRoute from './routes/User.js'
    import menuItemRoutes from './routes/menuRoutes.js'
    import Personroutes from './routes/personRoutes.js';
     import staticRoute from './routes/staticrouete.js'
    

    

    const localAuthMiddleware=passport.authenticate('local',{session:false})

    app.use('/person',Personroutes );
    app.use('/menu',localAuthMiddleware,menuItemRoutes);
    app.use('/user',userRoute);
    app.use('/', staticRoute);
  
    app.get('/',localAuthMiddleware, (req,res)=>{
        // res.render('home.ejs')
        res.send("Welcome to my Hotel")
    })
     
    passport.use(new LocalStrategy( async (USERNAME, password, done) => {
        try {
            console.log("received credentials", USERNAME, password);
            const user = await Person.findOne({ username: USERNAME });
    
            if (!user) {
                return done(null, false, { message: 'Invalid username' });
            }
    
            const userPass = await user.comparePassword(password);  
            if (userPass) {
                done(null, user);
            } else {
                done(null, false, { message: 'Invalid password' });
            }
            
        } catch (error) {
            done(error);
        }
    }));
    
const PORT=  process.env.PORT||  3000;
app.listen(PORT, () =>{
    console.log(`server is running at ${PORT}`);
})