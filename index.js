let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

let apiRoutes = require('./routes')

let app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(
    "mongodb+srv://arthreis:@123@456@cluster0.e1ots.mongodb.net/system-02?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
    )

var db = mongoose.connection

const PORT = process.env.port || 3333

//default route
app.get('/', function (req, res) {
    res.send("Running...")
})

//routes in the App
app.use('/api', apiRoutes)

app.use('')


app.listen(PORT, function() {
    console.log("Started on port: ", PORT)
})