const express = require("express");
const dbConnect = require("./DBConnect");
const libgen = require('libgen');
const PORT = process.env.PORT || 3001;

const app = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require('./DBConnect');
const auth = require('./auth');
const User = require('./userModel');
const { request } = require("http");
const model = require("./userModel");
const cors = require('cors');



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

dbConnect();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Curb Cores Error by adding a header here
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });



// register endpoint.
app.post("/register", (request, response)=>{
    console.log(request.body);
    // hashing the password.
    bcrypt.hash(request.body.password, 10)
        .then((hashedPassword)=> {
            // creating the new user instance and collecting the data.
            const user = new User({
                name: request.body.name,
                email: request.body.email,
                password: hashedPassword,
                history:[{id:request.body.email}],
                wishlist:[{id:request.body.email}]
            })

            // save the new user
            user.save().then((result)=>{
                response.status(201).send({
                    message: "User Created Successfully",
                    result,
                })
            })
            .catch((error)=>{
                response.status(500).send({
                    message: "Error creating user",
                    error,
                })
            })
        })
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            })
        })
});

// login endpoint.
app.post('/login',(request,response)=>{
    User.findOne({ email: request.body.email })
        .then((user)=>{
            bcrypt.compare(request.body.password, user.password)
            .then((passwordCheck)=>{
                
                if(!passwordCheck){
                    return response.status(400).send({
                        message: "Password does not match",
                        error,
                    });
                }

                const token = jwt.sign(
                    {
                        userId: user._id,
                        userEmail: user.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                )

                response.status(200).send({
                    message: "Login Succesful",
                    email: user.email,
                    name: user.name,
                    token,
                })
            })
            .catch((err) =>{
                response.status(400).send({
                    message: "Password Does not Match",
                    err,
                })
            })
        })
        .catch((e)=>{
            response.status(404).send({
                message: 'Email not found',
                e,
            })
        })
})

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});



// libgen api

app.post('/search',async (req, res)=>{
    const urlString = await libgen.mirror();
    console.log(urlString);
    const options = {
        mirror: urlString,
        query: req.body.query,
        count: 20,
        sort_by: 'year',
        reverse: true
    }
    try {
        const data = await libgen.search(options);
        res.json(data);
    } catch (err) {
        console.error(err)
    }

})



app.post('/add',async (req, res)=>{
    
    const em = req.body.email;
    if(req.body.meth==="history"){
        const m = req.body.k;
        await model.updateOne({email:em}, {$push:{history:m}});
    }
    else if(req.body.meth==='wishlist'){
        const m = req.body.k;
        await model.updateOne({email:em}, {$push:{wishlist:m}}); 
    }
  
    else if(req.body.meth==='read'){
        // console.log(em);
        const data = await model.find({email:req.body.email});
        res.json(data);
    }
})




