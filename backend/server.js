const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require("passport");

const app = express();
const PORT = 4000;

app.use(cors());
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());


const db = require("./config/keys").mongoURI

// Connection to mongodb
mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})



const userapi = require('./routes/api/user')
const productapi = require('./routes/api/product')
const orderapi = require("./routes/api/order")
const user = require('./routes/user')


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// API endpoints

app.use("/api/user", userapi);
app.use("/api/product", productapi)
app.use("/api/order", orderapi)


app.use("/user",passport.authenticate("jwt",{session: false}),user);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
