if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl= process.env.ATLAS_DB_URL;

main().then( res=>{
    console.log("Conected to DB");
}).catch( err => {
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use((req, res, next) => {
    req.setTimeout(10 * 60 * 1000); // 10 minutes
    next();
  });


//to get information of body
app.use(express.urlencoded({extended: true}));

//to edit and update using methods other than get and post in ejs forms
app.use(methodOverride("_method"));

//to use ejsMate for common stylings like footer and navbars, etc.
app.engine("ejs", ejsMate);

//to use css styling from public folder
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600
  }
);

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};


// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });


app.use(session(sessionOptions));
app.use(flash());


//User Login and Authenticate
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


//LISTING ROUTES
app.use("/listings", listingRouter);
//REVIEW ROUTES
app.use("/listings/:id/reviews", reviewRouter);
//USER ROUTES
app.use("/", userRouter);


app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page Not Found!"))
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something Went Wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message})
})

app.listen(8080, (req,res) =>{
    console.log("Server listening on port 8080");
});