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
                id: volunteer.dataValues.StudentId,
                ClassId: volunteer.dataValues.ClassId
            }
        }).then(function(student) {
            if (!student) {
              res.status(404).send();
            }
            else {
              return student.getTags();
              res.send(student);
            }
        }).then((student) => {
            res.send(student);
        });
    });
}

export function getAll(req, res) {
    Volunteer.findAll({where:{ClassId: req.params.id }})
    .then((volunteers) => {
      let promises = volunteers.map((volunteer) => {
          return volunteer.getTags().then((tags) => {
            volunteer.dataValues.tags = tags.map((tag) => tag.name);
            return volunteer.dataValues;
          });
      });
      return Promise.all(promises);
    }).then((volunteers) => {
        res.send(volunteers);
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500);
    });
}
