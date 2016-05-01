//controller for volunteer

import express from 'express';
let router  = express.Router();

import { Volunteer, Student } from '../models';

export function insert(req, res) {

    Volunteer.create({
        activityID: req.body.activityID,
        studentID: req.body.studentID,
        classCode: req.body.classCode,
        dateVolunteered: new Date(),
        note: req.body.note
    }).then(function(volunteer) {
        res.status(200).send(volunteer);
    });
}

export function getAvailableVolunteers(req, res) {
    Student.findAll({
        where: {
            ClassCode: req.params.classCode
        }
    }).then(function(students) {
        res.send(students);
    });
}

export function getOne(req, res) {

    Volunteer.findOne({
        where: {
            volunteerID: req.params.id
        }
    }).then(function(volunteer) {
        Student.findOne({
            where: {
                studentId: volunteer.studentID,
                ClassClassCode: volunteer.classCode
            }
        }).then(function(student) {
            res.send(student);
        });
    });
}
