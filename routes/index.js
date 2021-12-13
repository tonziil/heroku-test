const express = require('express');
const router = express.Router();

const { Student } = require('../models/student')

// Get all students
router.get('/getAll', (req, res) => {
    Student.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Save Student
router.post('/add', (req, res) => {
    const stu = new Student({
        name: req.body.name,
        ssn: req.body.ssn,
        email: req.body.email,
        mobile: req.body.mobile,
        status: req.body.status
    });
    stu.save((err, data) => {
        res.status(200).json({
            code: 200, message: 'Student added successfully',
            addStudent: data
        })
    });
});

// Get single student
router.get('/listOne/:id', (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Update a student
router.put('/edit/:id', (req, res) => {
    const stu = new Student({
        name: req.body.name,
        ssn: req.body.ssn,
        email: req.body.email,
        mobile: req.body.mobile,
        status: req.body.status
    });
    Student.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Student with id=${id}`
                });
            } else {
                res.send({ message: "Student was updated successfully." });
            }      
        })
        .catch(err => {
        res.status(500).send({
        message: "Error updating Student with id=" + req.params.id
      });
    });
});

// Delete a student
router.delete('/deleteone/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Student with id=${req.params.id}. Maybe Student was not found!`
                });
            } else {
                res.send({
                    message: "Student was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + req.params.id
            });
        });
});

// Delete all student 
router.delete('/deleteall', (req, res) => {
    Student.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Students were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    });
});

module.exports = router;