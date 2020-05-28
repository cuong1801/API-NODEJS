const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const list = new Object();
router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});
router.post("/", (req, res) => {
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.tel = req.body.tel;
  employee.role = req.body.role;
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}
router.get("/list", async (req, res) => {
  var list= new Object();
  console.log(req.body)
  await Employee.find((err, docs) => {
    if (!err) {
      list=docs;
      console.log(list)
      // console.log(list);
      res.render("employee/list", {
        list: list,
      });
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

module.exports = router;
