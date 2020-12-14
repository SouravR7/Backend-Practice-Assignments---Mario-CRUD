
const mongoose = require('mongoose');
const port = 3000
const app = require('./app');
//mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// mongoose.connection.once('open', () =>{
//     console.log('connection established')
// }).on('connectionError',(err) =>{
//     console.log(err);
// })

app.listen(port, () => console.log(`App listening on port ${port}!`));