const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

const secretKey = 'abcabcaaacbc';
app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({message: "No token provided!"});
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.body.username = decoded.username; // Store username in request object
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token!"});
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
