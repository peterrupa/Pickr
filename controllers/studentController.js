/*
    Controller for the model student.
*/

import express from 'express';
let router  = express.Router();

import { Student } from '../models';
import { Class } from '../models';

//GET STUDENT
export function getAll(req, res) {
		Student.findAll()
		.then(function(students){
			if(students)
				res.status(200).send(students);
			else
				res.status(404).send(null);
		});
}

export function getOne(req, res) {
    Student.find({
    	where: {
    		studentId: req.body.studentId
    	}
    }).on('success', function(student) {
    	res.status(200).send(student);
    }).on('error', function(){
    	res.status(404).send(null);
    });
}

//CREATE STUDENT
export function insert(req, res) {
		Class.find({
			where:{
				classCode: req.body.classCode
			}
		}).then(function(classEntity){
			if(classEntity){
				Student.create({
				    studentId: req.body.studentId,
				    studentFName: req.body.studentFName,
				    studentLName: req.body.studentLName,
				    classCode: req.body.classCode
				}).then(function(student){
						if(student)
							res.status(200).send(student);
						else
							res.status(404).send(null);
				});
			}
			else
				res.status(404).send(null);
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
				}).then(function(student) {
					if(student)
						res.status(200).send(student);
					else
						res.status(404).send(null);
				});
			} else
				res.status(404).send(null);
    });
}

//DELETE STUDENT
export function deleteStudent(req, res) {
     Student.find({ where: {studentId: req.body.studentId} })
    .then(function(student){
        if(student){
					student.destroy()
					.then(function(){
						res.status(200).send("Delete successful");
					});
				} else 
					res.status(404).send("Student not found");
    });
}
