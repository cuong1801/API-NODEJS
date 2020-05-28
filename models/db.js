const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: true}, (err)=>{
    if(!err){console.log("MongoDB connection succeeded")}
    else {console.log("error in db connection ")}
});
require('./employee.model')