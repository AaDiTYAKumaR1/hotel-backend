import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
// import { setUser } from "../services/auth.js";
export async function handleUserSignup(req, res) {
    // Destructuring data from the request body
    const { name, email, password } = req.body;
    
    try {
        // Creating a new user document in the database
        await User.create({
            name,
            email,
            password
        });
        
        // Rendering an EJS template after successful signup
        return res.redirect("/")
    } catch (error) {
        // Handling errors, such as database errors
        console.error("Error occurred during user signup:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    
        // Find user by email and password
        const user = await User.findOne({ email, password });
       
        // If user not found or password doesn't match, show error message
        if (!user ) {
            return res.render("login", { error: 'Invalid username or password' });
        }
        
        // Redirect user to home page on successful login
        const sessionId=uuidv4();
        setUser( sessionId, user);
        res.cookie( "uid" ,sessionId);
        return res.redirect("/");
    // } catch (error) {
    //     console.error("Error occurred during user login:", error);
    //     return res.status(500).send("Internal Server Error");
    // }
}

