const express = require('express')
const app = express()
const marioModel = require('./models/marioChar');

app.use(express.json());

app.get("/mario", (req,res)=>{

    marioModel.find().then(data => res.send(data))
    .catch(error => res.send(error));
    return;
});

app.get("/mario/:id", (req,res)=>{
    marioModel.findById(req.params.id)
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })});


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

    res.send(mario);
})

app.patch("/mario/:id", (req, res) => {
    marioModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({"message" : err.message}))
})

app.delete("/mario/:id", (req, res) => {
    marioModel.deleteOne({_id: req.params.id})
    .then(data => {
        return res.status(200).send({"message":"character deleted"})
    })
    .catch(err => res.status(400).json({"message":err.message}))
})



module.exports = app;

