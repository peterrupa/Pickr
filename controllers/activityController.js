/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

// be sure to import your model here
import { Activity } from '../models';

export function getAll(req, res) {
		Activity.findAll()
    .then(function(activities) {
        res.send(activities);
    });
}

//GET ACTIVITY
export function getOne(req, res) {
    Activity.find({ where: {activityId: req.body.searchId} }).on('success', function(activity) {
    	res.send(activity);
    });
}

//CREATE ACTIVITY
export function insert(req, res) {
    Activity.create({
        activityId: req.body.activityId,
        name: req.body.name,
        desc: req.body.desc,
    }).then(function(activity) {
        res.send(activity);
    });
}

//UPDATE ATTRIBUTES
export function update(req, res) {
    Activity.find({ where: {activityId: req.body.searchId} })
    .then(function(activity) {
    	if(activity){
			activity.updateAttributes({
				activityId: req.body.activityId,
				name: req.body.name,
				desc: req.body.desc
			}).then(function(activity) {});
			res.send(activity);
		}
    });
}

//DELETE ACTIVITY
export function deleteActivity(req, res) {
    Activity.find({ where: {activityId: req.body.searchId} }).on('success', function(activity) {
        if(activity){
					activity.destroy();
				}
    });
}
