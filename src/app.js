const express = require('express');


const app = express();


app.get('/', (req,res)=>{
	return res.sendStatus(200)
});


module.exports = app;
