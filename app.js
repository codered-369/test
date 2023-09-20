const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/contactDance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const port = 8000;

// defining mongoose

var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    email: String,
    phone_number: String
});
var Contact  = mongoose.model('Contact',contactSchema);

// EXPRESS
app.use('/static',express.static('static'));
app.use(express.urlencoded())

//PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/',(req, res) => {
    const params = {}
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req, res) => {
    const params = {}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("this item is send to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});