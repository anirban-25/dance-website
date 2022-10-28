const express=require("express")

const app=express();
const port=2000;
const path=require("path");
const fs=require("fs");
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));  
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phonenum: String,
    email: String,
    address: String,
    concern: String
});
const contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()); 
//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINT
app.get('/', (req, res)=>{
    const params={ };
    res.status(200).render('home.pug', params); 
})
app.get('/contact', (req, res)=>{
    const params={ }
    res.status(200).render('contact.pug', params);
})


app.post('/contact', (req, res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The app started successfully on port ${port}`)
})
