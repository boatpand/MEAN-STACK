const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@mean-stack.cy0ig4s.mongodb.net/node-angular").then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
// when deploy use app.use("/images", express.static(path.join("images"))); instead

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});

app.use("/api/posts/", postsRoutes);
app.use("/api/user/", userRoutes);

module.exports = app;
