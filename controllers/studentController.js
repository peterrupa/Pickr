/*
    Controller for the model student.
*/

import express from 'express';
let router  = express.Router();

import { Student } from '../models';

//GET STUDENT
export function getAll(req, res) {
    Student.findAll()
    .then(function(students) {
    res.send(students);
    });
}

export function getOne(req, res) {
    /*Student.find({ where: {studentId: req.body.studentId} }).on('success', function(student) {
        res.send(student);
    });*/
    Student.findOne({
        where: {
            studentId: req.params.studentId
        }
    }).then((student) => {
        res.status(200).send(student);
    });
}

//CREATE STUDENT
export function insert(req, res) {
    Student.create({
        studentId: req.body.studentId,
        studentFName: req.body.studentFName,
        studentLName: req.body.studentLName,
        classCode: req.body.classCode
    }).then(function(student) {
        res.send(student);
    });
}

//UPDATE STUDENT
export function update(req, res) {
    Student.find({ where: {studentId: req.body.studentId} })
    .then(function(student) {
        if(student){
            student.updateAttributes({
                studentId: req.body.studentId,
                studentFName: req.body.studentFName,
                studentLName: req.body.studentLName
            }).then(function(student) {});
            res.send(student);
        }
    });
}

//DELETE STUDENT
export function deleteStudent(req, res) {
    Student.find({ where: {studentId: req.body.studentId} })
    .then(function(student){
        if(student){
                    student.destroy()
                    .then(function(){
                        res.send("Hello");
                    });
                }
    });
}
