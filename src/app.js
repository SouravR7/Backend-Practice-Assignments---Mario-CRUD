const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get("/mario", (req,res)=>{

    // let characters = await marioModel.find({});
    // res.send(characters);

    marioModel.find({}, (err, data) => {
        if(err){
            res.status(400).json({"message": error.message});
        }
        else{
            res.json(data);
        }
    });
});

app.get("/mario/:id", (req,res)=>{

    marioModel.findOne({
        _id: id,
    }).then((err,data) => {
        if (err) {
            res.status(400).json({"message": error.message});
        } else{
            res.json(data);
        }
    });
});


app.post("/mario",(req,res)=>{
    let name = req.body.name;
    let weight = req.body.weight;

    if(name === undefined || name.length === 0 || weight === undefined){
        res.status(400).send({message: 'either name or weight is missing'});
        return;
    }

    const mario = new marioModel({
        name,
        weight
    })
    mario.save();
    // console.log(name);
    // console.log(weight);
    // console.log(mario);
    res.status(201).send(mario);
})

app.patch("/mario/:id",async (req,res)=>{
    
    try {

        let id = req.params.id;
        let updateObject = req.body;

        let check = await marioModel.find({_id :id});

         if(check.length === 0) throw new Error;

        await marioModel.update(
            { _id: id },
            {$set: updateObject},
            {returnOriginal: false}
        );

        let data = await marioModel.findById({_id:id})

        // console.log(updateObject);
        // console.log(data);

        res.status(201).send(data);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.delete("/mario/:id",async (req,res)=>{
    
    try {

        let id = req.params.id;

        let data = await marioModel.findById({_id:id});

        if(!data){
             res.status(400).send({message: "error.message"});
            return;
            throw new error;
        }

        await marioModel.deleteOne(
            { _id: id }
        );

        // console.log(updateObject);
        // console.log(data);

        res.status(200).send({message: 'character deleted'});
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})



module.exports = app;
