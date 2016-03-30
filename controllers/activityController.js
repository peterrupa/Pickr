/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

import { Activity } from '../models';

//GET ACTIVITY
export function getAll(req, res) {
		Activity.findAll()
    .then(function(activities) {
        if(activities)
        	res.status(200).send(activities);
        else
        	res.status(404).send(null);
    });
}

export function getOne(req, res) {
    Activity.find({
    	where: {
    		activityId: req.body.activityId
    	} 
    }).then(function(activity){
    	if(activity)
    		res.status(200).send(activity);
    	else
    		res.status(404).send(null);	
    });
}
	
//CREATE ACTIVITY
export function insert(req, res) {
    Activity.create({
        activityId: req.body.activityId,
        activityName: req.body.activityName,
        activityDesc: req.body.activityDesc,
    }).then(function(activity) {
        if(activity)
        	res.status(200).send(activity);
        else
        	res.status(404).send(null);
    });
}

//UPDATE ATTRIBUTES
export function update(req, res) {
    Activity.find({ where: {activityId: req.body.activityId} })
    .then(function(activity) {
    	if(activity){
				activity.updateAttributes({
					activityId: req.body.activityId,
					activityName: req.body.activityName,
					activityDesc: req.body.activityDesc
				}).then(function(activity) {
					if(activity)
						res.status(200).send(activity);
					else
						res.status(404).send(null);
				});
			} else {
				res.status(404).send(null);
			}
    });
}

//DELETE ACTIVITY
export function deleteActivity(req, res) {
    Activity.find({ where: {activityId: req.body.activityId} })
    .then(function(activity){
        if(activity){
					activity.destroy()
					.then(function(){
						res.status(200).send("Delete successful");
					});
				} else 
					res.status(404).send("Activity not found");
    });
}
