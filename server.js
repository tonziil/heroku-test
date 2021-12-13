const express = require("express")
const dotenv = require('dotenv')
const routes = require("./routes/index")
const connectDB = require('./config/db')
dotenv.config('.env')

const app = express()
connectDB();

// parse requests of content-type - application/json
app.use(express.json());

// Static file
app.use(express.static('public'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', routes);
// app.use('/api/registration', register);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
   // res.render('registration');
})

app.set('view engine', 'ejs')



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});