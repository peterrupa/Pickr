//controller for volunteer

import express from 'express';
let router  = express.Router();


import { Volunteer } from '../models';

export function insert(req, res) {

    Volunteer.create({
        activityID: req.body.activityID,
        studentID: req.body.studentID,
        dateVolunteered: new Date(),
        note: req.body.note
    }).then(function(volunteer) {
        res.send(volunteer);
    });
}

export function findOne(req, res) {

	Volunteer.find({
		where: {
		    volunteerID: req.params.id
		}
	}).then(function(volunteer) {
		res.send(volunteer);
	});
}
