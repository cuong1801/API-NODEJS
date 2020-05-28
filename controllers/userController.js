const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
// const list = new Object();
router.get("/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.post("/", (req, res) => {
  insertRecord(req, res);
  //   else updateRecord(req, res);
});

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.tel = req.body.tel;
  employee.role = req.body.role;
  employee.save((err, doc) => {
    if (!err) res.json("Đã thêm");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.json("Lỗi cmnr");
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.json("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.json({
            viewTitle: "Update Employee false",
            employee: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

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

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.json(doc);
    }
  });
});
router.put("/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, (err, doc) => {
    console.log(doc)
  });
});

router.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.json("đã xóa ");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});

module.exports = router; 
