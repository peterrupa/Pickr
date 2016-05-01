//controller for volunteer

import express from 'express';
let router  = express.Router();

import { Volunteer, Student } from '../models';

export function insert(req, res) {

    Volunteer.create({
        ActivityId: req.body.ActivityId,
        StudentId: req.body.StudentId,
        ClassId: req.body.ClassId,
        dateVolunteered: new Date(),
        note: req.body.note
    }).then(function(volunteer) {
        res.status(200).send(volunteer);
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

export function getAll(req, res) {
    Volunteer.findAll({where:{volunteerID: req.params.id }})
    .then((volunteers) => {
        // fetch tags for each student
        let promises = volunteers.map((volunteer) => {
            return volunteer.getTags().then((data) => {
                volunteer.dataValues.tags = data.map((tag) => tag.dataValues.name);

                return volunteer.dataValues;
            });
        });

        return Promise.all(promises);
      })
      .then((students) => {
          res.send(students);
      });
}
